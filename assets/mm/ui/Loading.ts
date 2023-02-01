import { _decorator, Component, ProgressBar, Label, Asset, UITransform, v3, JsonAsset, sys, game, tween } from 'cc';
import { app } from '../App';
const { ccclass, property } = _decorator;

import { HotUpdate, HotUpdateCode } from "../utils/HotUpdate";
import { Utils } from '../utils/Utils';

@ccclass('Loading')
export class Loading extends Component {

    @property(ProgressBar)
    progressBar: ProgressBar | null = null;
    @property(Label)
    lblDesc: Label | null = null;
    @property(Label)
    lblProgress: Label | null = null;

    @property({
        tooltip: "原生平台是否要开启热更新"
    })
    hotUpdate = false;

    @property({
        type: Asset,
        tooltip: "本地project.manifest文件",
        visible: function () { return (this as any).hotUpdate; }
    })
    manifest: Asset | null = null;
    start() {
        let transform = this.getComponent(UITransform);
        if (transform) {
            this.node.scale = v3(1, 1);
            transform.priority = 10000;
        }
        this.loadCfg();
    }
    loadCfg() {
        this.setTips("Loading Config")
        // Utils.loadRemote("http://localhost/GameConfig.json?" + Date.now())
        //     .then((v: JsonAsset) => {
        //         if (this.hotUpdate && this.manifest && sys.isNative) {
        //             this.checkVersion();
        //         } else {
        //             this.loadRes()
        //         }
        //     })
        //     .catch(() => {
        //         UIManager.Inst.tipMseeage.showTipBox(
        //             "遊戲配置加載失敗，請檢查網絡是否正常！", 1,
        //             () => {
        //                 this.loadCfg();
        //             }
        //         );
        //     })
        this.loadRes();
    }
    checkVersion() {
        HotUpdate.Inst.start(
            this.manifest!,
            this.setTips.bind(this),
            this.onProgress.bind(this),
            this.complete.bind(this)
        );
    }
    async loadRes() {
        //加载游戏数据
        this.setTips("Loading Game Data")
        // let gameDatas = await Utils.loadDir("data", this.onProgress.bind(this));
        // for (const v of gameDatas) {
        //     if (v.name == "GameData") {
        //         DataManager.Inst.initData((v as cc.JsonAsset).json);
        //     } else if (v.name == "Language") {
        //         Language.init((v as cc.JsonAsset).json["Language"], null);
        //     }
        // }
        //加载ui
        // if (cc.sys.isBrowser) {
        //     this.setTips("Loading Game Scene")
        //     await Utils.loadDir("ui", this.onProgress.bind(this));
        // }
        let obj = { x: 0 };
        tween(obj)
            .to(1, { x: 1 }, {
                progress: (start, end, curent, ratio) => {
                    let v = start + (end - start) * ratio;
                    
                    if (this.progressBar) {
                        this.progressBar.progress = v;
                    }
                    if (this.lblProgress) {
                        this.lblProgress.string = Math.floor(v * 100) + "%";
                    }
                    return v;
                }
            })
            .call(() => {
                app.ui.show(app.uiKey.UIHUD).then(()=>{
                    this.node.destroy();
                })
            })
            .start();
    }
    setTips(content: string) {
        if (this.lblDesc) {
            this.lblDesc.string = content;
        }
        if (this.progressBar) {
            this.progressBar.progress = 0;
        }
    }

    onProgress(loaded: number, total: number) {
        if (this.progressBar) {
            let progress = loaded / total;
            progress = isNaN(progress) ? 0 : progress;
            if (this.progressBar.progress > progress) return;
            this.progressBar.progress = progress;
            if (this.lblProgress) {
                this.lblProgress.string = Math.round(progress * 100) + "%";
            }
        }
    }

    /**
     * 热更新结果
     * @param code undefined:未进行热更新 
     */
    complete(code?: HotUpdateCode) {
        console.log("HotUpdate ResultCode = ", code);
        if (code == HotUpdateCode.Success) {
            // cc.audioEngine.stopAll();
            game.restart();
        } else if (code == HotUpdateCode.Fail) {
            app.ui.tipMsg.showTipBox(
                "版本更新失敗，請檢查網絡是否正常，重新嘗試更新!", 1,
                () => {
                    // audio.stopAll();
                    game.restart();
                }
            );
        } else {//最新版本或manifest文件异常 跳过更新
            this.loadRes()
        }
    }
}
