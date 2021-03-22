import { HotUpdate, HotUpdateCode } from "../utils/HotUpdate";
import UIMgr from "../manager/UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Loading extends cc.Component {
    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;
    @property(cc.Label)
    lblDesc: cc.Label = null;
    @property(cc.Label)
    lblProgress: cc.Label = null;

    @property({
        tooltip: "原生平台是否要开启热更新"
    })
    hotUpdate = false;
    @property({
        type: cc.Asset,
        tooltip: "本地project.manifest文件",
        visible: function () { return this.hotUpdate }
    })
    manifest: cc.Asset = null;

    start() {
        this.node.opacity = 255;
        this.node.zIndex = 10000;
        this.loadCfg();
    }

    loadCfg() {
        this.setTips("Loading Config")
        // Utils.loadRemote("http://localhost/GameConfig.json?" + Date.now())
        //     .then((v: cc.JsonAsset) => {
        //         if (this.hotUpdate && this.manifest && cc.sys.isNative) {
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
            this.manifest,
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
        cc.tween(obj).to(1.5, { x: 1 }, {
            progress: (start, end, curent, ratio) => {
                let v = cc.misc.lerp(curent, end, ratio);
                this.progressBar.progress = v;
                this.lblProgress.string = Math.floor(v * 100) + "%";
                return v;
            }
        })
            .call(() => {
                this.node.destroy();
                cc.director.loadScene("TestUI");
            })
            .start();
    }

    setTips(content: string) {
        this.lblDesc.string = content;
        this.progressBar.progress = 0;
    }

    onProgress(loaded: number, total: number) {
        let progress = loaded / total;
        progress = isNaN(progress) ? 0 : progress;
        if (this.progressBar.progress > progress) return;
        this.lblProgress.string = Math.round(progress * 100) + "%";
        this.progressBar.progress = progress;
    }

    /**
     * 热更新结果
     * @param code undefined:未进行热更新 
     */
    complete(code?: HotUpdateCode) {
        console.log("HotUpdate ResultCode = ", code);
        if (code == HotUpdateCode.Success) {
            cc.audioEngine.stopAll();
            cc.game.restart();
        } else if (code == HotUpdateCode.Fail) {
            UIMgr.Inst.tipMsg.showTipBox(
                "版本更新失敗，請檢查網絡是否正常，重新嘗試更新!", 1,
                () => {
                    cc.audioEngine.stopAll();
                    cc.game.restart();
                }
            );
        } else {//最新版本或manifest文件异常 跳过更新
            this.loadRes()
        }
    }

}