import { Asset, AssetManager, assetManager, ImageAsset, resources, Sprite, SpriteFrame, sys } from "cc";
import { GameConfig } from "../../scripts/base/GameConfig";
import { MLogger } from "../module/logger/MLogger";
import { SingletonFactory } from "../utils/SingletonFactory";

class AssetCache {
    public static get Inst() { return SingletonFactory.getInstance<AssetCache>(AssetCache); }
    public cache: Map<string, Asset> = new Map();
}

class BundleMgr {

    public static get Inst() {
        return SingletonFactory.getInstance<BundleMgr>(BundleMgr);
    }

    //bundle名字:Bundle
    private bundles: Map<string, AssetManager.Bundle> = new Map();

    //资源地址:Bundle名字
    private address: Map<string, string> = new Map();
    //资源目录:资源地址数组
    private dirAddress: Map<string, string[]> = new Map();

    private onInst() {
        this.resolveResources();
    }

    /** 获取远程bundle的版本 */
    private getBundleVersion(bundleName: string) {
        return GameConfig.bundleVersion.get(bundleName);
    }

    private resolveResources() {
        if (resources) this.resolveBundle(resources);
    }

    private resolveBundle(bundle: AssetManager.Bundle) {
        this.bundles.set(bundle.name, bundle);
        bundle["_config"].paths.forEach(v => {
            v.forEach(v1 => {
                let path: string = v1.path;
                // MLogger.debug(path);
                let dir = path.substring(0, path.lastIndexOf("/"));
                if (!this.dirAddress.get(dir)) this.dirAddress.set(dir, []);
                this.dirAddress.get(dir).push(path);

                if (!this.address.has(path)) {
                    this.address.set(path, bundle.name);
                }
                else {
                    MLogger.error(`资源地址不能重复  ${bundle.name}  ${v1.path}`);
                }
            });
        });
    }

    public projectBundles() {
        let builtin: string[] = ["resources", "main", "internal"];
        let arr: string[] = assetManager['_projectBundles'];
        let result: string[] = [];
        for (const v of arr) {
            if (builtin.indexOf(v) == -1) {
                result.push(v);
            }
        }
        return result;
    }

    public loadBundle(bundleName: string, onFileProgress?: (loaded: number, total: number) => void) {
        let p = new Promise<AssetManager.Bundle>((resolve, reject) => {
            assetManager.loadBundle(bundleName,
                { version: this.getBundleVersion(bundleName), onFileProgress: onFileProgress },
                (err, bundle) => {
                    if (err) {
                        MLogger.error(err);
                        reject(err);
                    } else {
                        this.resolveBundle(bundle);
                        resolve(bundle);
                    }
                }
            )
        })
        return p;
    }

    public loadAllBundle(bundleNames?: string[], onFileProgress?: (loaded: number, total: number) => void) {
        if (!bundleNames) {
            bundleNames = this.projectBundles();
        }
        let p = new Promise<AssetManager.Bundle[]>((resolve, reject) => {
            let progress: number[] = [];
            let bundleArr: AssetManager.Bundle[] = [];
            for (let i = 0; i < bundleNames.length; i++) {
                let bundleName = bundleNames[i];
                assetManager.loadBundle(bundleName,
                    {
                        onFileProgress: (loaded: number, total: number) => {
                            if (onFileProgress) {
                                progress[i] = loaded / total;
                                let totalProgress = 0;
                                for (let i = 0; i < bundleNames.length; i++) {
                                    totalProgress += (progress[i] || 0);
                                }
                                onFileProgress(totalProgress / bundleNames.length, 1);
                            }
                        }
                    },
                    (err, bundle) => {
                        if (err) {
                            MLogger.error(err);
                            reject(err)
                        } else {
                            bundleArr.push(bundle);
                            this.resolveBundle(bundle);
                            if (bundleArr.length == bundleNames.length) {
                                resolve(bundleArr);
                            }
                        }
                    }
                )
            }
        })
        return p;
    }

    public isAssetExists(location: string) {
        return this.address.has(location);
    }

    public getBundleByLocation(location: string): AssetManager.Bundle {
        let ab: AssetManager.Bundle = null;
        if (this.address.has(location)) {
            ab = this.bundles.get(this.address.get(location));
            if (!ab) console.error(`location: ${location}  资源所在Bundle未加载`);

        } else {
            console.error(`location: ${location}  资源不存在或所在Bundle未加载`);
        }
        return ab;
    }

    public getDirectoryAddress(location: string): string[] {
        return this.dirAddress.get(location);
    }
}

/**
 * 资源加载管理类 
 * 每调用一次资源加载接口,资源引用次数+1
 * 若需要自动释放资源,请使用继承AssetHandler的组件来加载资源,组件所在节点销毁时,通过组件加载的资源引用计数-1
 */
export class AssetMgr {

    static get cache() {
        return AssetCache.Inst.cache;
    }

    static get projectBundles() {
        return BundleMgr.Inst.projectBundles();
    }

    static loadAllBundle(bundleNames?: string[], onFileProgress?: (loaded: number, total: number) => void) {
        return BundleMgr.Inst.loadAllBundle(bundleNames, onFileProgress);
    }

    static isAssetExists(location: string) {
        return BundleMgr.Inst.isAssetExists(location);
    }



    static loadAsset<T extends Asset>(location: string, type?: new (...args: any[]) => T) {
        let p = new Promise<T>((resolve, reject) => {
            let casset = this.cache.get(location) as T;
            if (casset?.isValid) {
                casset.addRef();
                resolve(casset);
                return;
            }
            let bundle = BundleMgr.Inst.getBundleByLocation(location);
            bundle.load(location, type, (err, asset) => {
                if (err) {
                    console.error(err);
                    resolve(null);
                }
                else {
                    asset.addRef();
                    this.cache.set(location, asset);
                    resolve(asset);
                }
            });
        })
        return p;
    }

    static async loadDirAsset<T extends Asset>(location: string, type: new (...args: any[]) => T) {
        let list = BundleMgr.Inst.getDirectoryAddress(location);
        if (!list || list.length == 0) {
            MLogger.error("目录中无资源");
            return;
        }

        let result: T[] = [];
        for (const address of list) {
            let asset = await this.loadAsset(address, type);
            result.push(asset);
        }
        return result;
    }

    static loadRemoteAsset<T extends Asset>(url: string) {
        let p = new Promise<T>((resolve, reject) => {
            let casset = this.cache.get(url) as T;
            if (casset?.isValid) {
                casset.addRef();
                resolve(casset);
                return;
            }
            assetManager.loadRemote<T>(url, { ext: url.substring(url.lastIndexOf(".")) }, (err, asset) => {
                if (err) {
                    console.error(err);
                    resolve(null);
                }
                else {
                    this.cache.set(url, asset);
                    asset.addRef();
                    resolve(asset);
                }
            });
        })
        return p;
    }



    static async loadRemoteSpriteFrame(url: string) {
        let casset = this.cache.get(url);
        if (casset?.isValid) {
            return casset as SpriteFrame;
        }
        let img = await this.loadRemoteAsset<ImageAsset>(url);
        if (img) {

            let spFrame = SpriteFrame.createWithImage(img);
            spFrame.addRef();
            this.cache.set(url, spFrame);
            return spFrame;
        }
        return null;
    }

    /**
    * 加载图片到Sprite
    * @param sprite 目标Sprite组件
    * @param location 路径（本地路径不带扩展名 远程路径带扩展名）
    */
    static async loadSprite(sprite: Sprite, location: string) {
        if (!sprite?.isValid) {
            console.error("Sprite无效 " + location);
            return;
        }
        if (location.startsWith("http") || location.startsWith("/")) {
            let spFrame = await this.loadRemoteSpriteFrame(location);
            sprite.spriteFrame = spFrame;
        } else {
            let spFrame = await this.loadAsset(location, SpriteFrame);
            sprite.spriteFrame = spFrame;
        }
    }

    /**
     * 原生平台下载文件到本地
     * @param url 文件下载链接
     * @param onFileProgress 文件下载进度回调(同一url仅第一次传入的回调有效)
     */
    static download(url: string, onFileProgress?: (loaded: number, total: number) => void) {
        let ext = url.substring(url.lastIndexOf("."));
        let p = new Promise<any>((resolve, reject) => {
            if (sys.isBrowser) {
                resolve(url);
                return;
            }
            assetManager.downloader.download(
                url, url, ext,
                {
                    onFileProgress: onFileProgress
                },
                (err, res) => {
                    if (err) {
                        console.log(url, "download fail", err?.message);
                        reject(null);
                    } else {
                        resolve(res);
                    }
                }
            )
        })
        return p;
    }

    /** 让资源引用计数增加 */
    static AddRef(location: string, decCount = 1) {
        let asset = this.cache.get(location);
        if (asset?.isValid) {
            for (let i = 0; i < decCount; i++) {
                asset.addRef();
            }
        } else {
            MLogger.warn(`[AddRef] 资源已销毁 ${location}`);
        }
    }

    /** 让资源引用计数减少 */
    static DecRef(location: string, decCount = 1) {
        let asset = this.cache.get(location);
        if (asset?.isValid) {
            for (let i = 0; i < decCount; i++) {
                asset.decRef();
            }
        } else {
            MLogger.warn(`[DecRef] 资源已销毁 ${location}`);
        }
    }

    /** 让目录下所有资源引用计数减少 */
    static DecDirRef(location: string, decCount = 1) {
        let list = BundleMgr.Inst.getDirectoryAddress(location);
        if (!list || list.length == 0) {
            MLogger.error("目录中无资源");
            return;
        }
        for (const v of list) {
            this.DecRef(v, decCount);
        }
    }

}
