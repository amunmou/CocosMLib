
//1.在 main.js 的开头添加链接中代码(https://docs.cocos.com/creator/2.4/manual/zh/advanced-topics/hot-update.html)
//2.修改main.js和当前脚本的搜索路径key，使其保持一致
//3.通常使用3位版本号(x.x.x)作为存储搜索路径的key

import { Asset, native, sys } from "cc";
import { MLogger } from "../module/logger/MLogger";

export enum EHotUpdateState {
    CheckUpdate,//检查更新
    DownloadFiles,//下载更新
    Finished,//结束更新
}

export enum EHotUpdateResult {
    UpToDate,//已经是最新版本
    ManifestError,//manifest文件异常
    Success,//更新成功
    Fail//更新失败
}

export class HotUpdate {

    private constructor() { }
    private static inst: HotUpdate;
    public static get Inst() { return this.inst || (this.inst = new HotUpdate()) }
    private _logger = new MLogger("HotUpdate")
    private _manifest: Asset = null;//本地project.manifest文件
    private _version: string;//游戏主版本号 只有三位
    private _assetsMgr: jsb.AssetsManager;//jsb资源管理器
    private _updating = false; //更新中
    private _failCount = 3;//更新失败重试次数
    private _onStateChange: (code: EHotUpdateState) => void;
    private _onDownloadProgress: (loaded: number, total: number) => void;
    private _onComplete: (code: EHotUpdateResult) => void;

    public start(manifest: Asset, version: string, onStateChange: (code: EHotUpdateState) => void, onDownloadProgress: (loaded: number, total: number) => void, onComplete: (code: EHotUpdateResult) => void) {
        if (!sys.isNative) {
            this._logger.warn("非原生环境");
            return;
        }
        this._manifest = manifest;
        this._version = version;
        this._onStateChange = onStateChange;
        this._onDownloadProgress = onDownloadProgress;
        this._onComplete = onComplete;

        let storagePath = ((native.fileUtils ? native.fileUtils.getWritablePath() : '/') + 'miles_remote_asset');
        this._logger.print('热更新资源存放路径：' + storagePath);

        this._onStateChange(EHotUpdateState.CheckUpdate);

        this._assetsMgr = new jsb.AssetsManager("", storagePath, this.versionCompareHandle.bind(this));
        this._assetsMgr.setVerifyCallback(this.VerifyHandle.bind(this));
        this.checkUpdate();
    }

    versionCompareHandle(versionA: string, versionB: string) {
        this._logger.print("客户端版本: " + versionA + ', 当前最新版本: ' + versionB);
        if (versionA != versionB) return -1;
        return 0;
    }

    VerifyHandle(path: string, asset: jsb.ManifestAsset) {
        let { compressed } = asset;
        if (compressed) {
            return true;
        } else {
            return true;
        }
    }

    /** 检查更新 */
    checkUpdate() {
        this._logger.debug("检查更新");
        if (this._updating) {
            return;
        }
        if (this._assetsMgr.getState() === jsb.AssetsManager.State.UNINITED) {
            let url = this._manifest!.nativeUrl;
            // if (assetManager.md5Pipe) {
            //     url = loader.md5Pipe.transformURL(url);
            // }
            this._assetsMgr.loadLocalManifest(url);
        }
        if (!this._assetsMgr.getLocalManifest() || !this._assetsMgr.getLocalManifest().isLoaded()) {
            this._logger.error("加载本地project.manifest文件失败");
            this.onUpdateComplete(EHotUpdateResult.ManifestError);
            return;
        }
        this._logger.debug("搜索路径:", JSON.stringify(this._assetsMgr.getLocalManifest().getSearchPaths()))
        this._assetsMgr.setEventCallback(this.checkUpdateCb.bind(this));
        this._assetsMgr.checkUpdate();
    }

    /** 下载更新文件 */
    downloadFiles() {
        this._onStateChange(EHotUpdateState.DownloadFiles);
        this._logger.debug("下载更新");
        if (!this._updating) {
            this._assetsMgr.setEventCallback(this.downloadFilesCb.bind(this));
            this._assetsMgr.update();
            this._updating = true;
        }
    }


    /** 检查更新回调 */
    checkUpdateCb(event: jsb.EventAssetsManager) {
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this._logger.error('manifest文件异常 ERROR_NO_LOCAL_MANIFEST', event.getMessage());
                this.onUpdateComplete(EHotUpdateResult.ManifestError);
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                this._logger.error('manifest文件异常 ERROR_DOWNLOAD_MANIFEST', event.getMessage());
                this.onUpdateComplete(EHotUpdateResult.ManifestError);
                break;
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this._logger.error('manifest文件异常 ERROR_PARSE_MANIFEST', event.getMessage());
                this.onUpdateComplete(EHotUpdateResult.ManifestError);
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                this._logger.debug("发现新版本，准备下载");
                this.downloadFiles();
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this._logger.debug('已经是最新版本');
                this.onUpdateComplete(EHotUpdateResult.UpToDate);
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                this._logger.debug('下载清单文件进度', event.getDownloadedFiles(), event.getTotalFiles());
                break;
            default:
                this._logger.debug("checkUpdateCb 未处理的情况", event.getEventCode(), event.getMessage());
        }
    }

    /** 下载更新文件回调 */
    downloadFilesCb(event: jsb.EventAssetsManager) {
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                this._logger.debug(`下载更新文件进度 ：${event.getDownloadedFiles()} / ${event.getTotalFiles()} `);
                this._onDownloadProgress(event.getDownloadedFiles(), event.getTotalFiles());
                break;
            case jsb.EventAssetsManager.ASSET_UPDATED:
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                this._logger.debug('更新完成', event.getMessage());
                this.onUpdateComplete(EHotUpdateResult.Success);
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                this._logger.debug('更新失败', event.getMessage());
                this._updating = false;
                this._failCount--;
                if (this._failCount >= 0) {
                    this.downloadFiles();
                } else {
                    this.onUpdateFail();
                }
                break;

            case jsb.EventAssetsManager.ERROR_UPDATING:
                this._logger.error('更新出错 ERROR_UPDATING', event.getMessage());
                this.onUpdateFail();
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                this._logger.error('更新出错 ERROR_DECOMPRESS', event.getMessage());
                this.onUpdateFail();
                break;



            default:
                this._logger.debug("downloadFilesCb 未处理的情况", event.getEventCode(), event.getMessage());
        }
    }

    onUpdateComplete(code: EHotUpdateResult.UpToDate | EHotUpdateResult.Success | EHotUpdateResult.ManifestError) {
        this._onStateChange(EHotUpdateState.Finished);
        if (code == EHotUpdateResult.Success) {
            let searchPaths = native.fileUtils.getSearchPaths();
            let newPaths = this._assetsMgr.getLocalManifest().getSearchPaths();
            this._logger.debug(`搜索路径 k=${this._version} v=${JSON.stringify(newPaths)}`);
            Array.prototype.unshift.apply(searchPaths, newPaths);//追加脚本搜索路径
            // !!!在main.js中添加脚本搜索路径，否则热更的脚本不会生效
            sys.localStorage.setItem(this._version, JSON.stringify(searchPaths));
            native.fileUtils.setSearchPaths(searchPaths);
        }
        this._assetsMgr.setEventCallback(null);
        this._onComplete(code);
    }

    onUpdateFail() {
        this._assetsMgr.setEventCallback(null);
        this._onComplete(EHotUpdateResult.Fail);
    }
}