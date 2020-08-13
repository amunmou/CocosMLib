import UIBase from "./UIBase";
import { EventUtil, GameEvent } from "../utils/EventUtil";
import UITipMessage from "./UITipMessage";
import UIGUide from "./UIGuide";

export class UIManager {

    private constructor() { }
    private static _inst: UIManager = null;
    public static get inst() {
        if (!this._inst) {
            this._inst = new UIManager();
        }
        return this._inst;
    }


    private uiDict: { [name: string]: UIBase } = null;
    private uiStack: UIBase[] = null;
    private cooldown = false;//ui打开时进入冷却

    /** 当前在最上层的UI */
    private topUI: UIBase = null;
    /** UI的半透明遮罩 */
    private shade: cc.Node = null;
    /** 普通的UI页面 */
    private NormalLayer: cc.Node = null;
    /** 比较上层的UI界面(如提示信息、引导等等)不参与UI堆栈 */
    private HigherLayer: cc.Node = null;

    public guide: UIGUide = null;
    public tipMseeage: UITipMessage = null;

    /** 场景加载后手动调用初始化 */
    public async init() {
        this.clear();
        EventUtil.on(GameEvent.OpenUI, this.openUI, this);
        EventUtil.on(GameEvent.CloseUI, this.closeUI, this);
        let canvas = cc.find("Canvas");
        this.NormalLayer = new cc.Node("NormalLayer");
        this.NormalLayer.setContentSize(cc.winSize);
        this.NormalLayer.parent = canvas;
        this.HigherLayer = new cc.Node("HigherLayer");
        this.HigherLayer.setContentSize(cc.winSize);
        this.HigherLayer.parent = canvas;

        this.shade = await this.instNode(EUIName.UIShade);

        //添加上层ui
        this.guide = await this.initUI(EUIName.UIGuide) as UIGUide;
        this.guide.node.parent = this.HigherLayer;
        this.tipMseeage = await this.initUI(EUIName.UITipMessage) as UITipMessage;
        this.tipMseeage.node.parent = this.HigherLayer;
    }


    public async openUI<T extends UIBase>(name: EUIName, obj?: { args: any, action: boolean }) {
        if (this.cooldown) return;
        this.cooldown = true;
        let ui = await this.initUI(name);
        ui.setArgs(obj?.args);
        ui.node.zIndex = this.topUI ? this.topUI.node.zIndex + 2 : 1;
        ui.node.parent = this.NormalLayer;
        this.uiStack.push(ui);
        this.topUI = ui;
        this.setShade();
        await ui.open(obj?.action);
        this.setUIVisible();
        this.cooldown = false;
        return ui as T;
    }

    public async closeUI(name: EUIName, action?: boolean) {
        let ui = this.uiDict[name];
        let index = this.uiStack.indexOf(ui)
        if (index != -1) {
            this.uiStack.splice(index, 1);
            this.topUI = this.uiStack[this.uiStack.length - 1];
            this.setShade();
            this.setUIVisible();
            await ui.close(action);
            ui.node.parent = null;
            if (ui.destroyNode) {
                ui.node.destroy();
                cc.resources.release(name);
                this.uiDict[name] = undefined;
            }
        }
    }

    private async initUI(name: EUIName): Promise<UIBase> {
        let ui = this.uiDict[name];
        if (ui?.isValid) {
            let index = this.uiStack.indexOf(ui);
            if (index > -1) {
                this.uiStack.splice(index, 1);
            }
            ui.setActive(true);
            ui.setOpacity(255);
            return ui;
        }
        let node = await this.instNode(name);
        ui = node.getComponent(UIBase);
        ui.init();
        ui.setUIName(name);
        this.uiDict[name] = ui;
        return ui;
    }

    private async instNode(name: string): Promise<cc.Node> {
        let p = new Promise<cc.Node>((resolve, reject) => {
            cc.resources.load(name, cc.Prefab, (err, prefab: any) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    let node = cc.instantiate(prefab);
                    resolve(node);
                }
            });
        });
        return p;
    }

    public getUI<T extends UIBase>(c: new () => T | EUIName): T {
        if (!c) return;
        if (typeof c === "string") {
            let ui = this.uiDict[c] as T;
            if (ui && ui.isValid) {
                return ui;
            }
        } else {
            for (let name in this.uiDict) {
                let ui = this.uiDict[name];
                if (ui instanceof c) return ui as T;
            }
        }
    }

    private setShade() {
        this.shade.parent = null;
        if (this.topUI?.showShade) {
            this.shade.zIndex = this.topUI.node.zIndex - 1;
            this.shade.parent = this.NormalLayer;
        }
    }

    private setUIVisible() {
        let isCover = false;
        for (let i = this.uiStack.length - 1; i >= 0; i--) {
            let ui = this.uiStack[i];
            if (i == this.uiStack.length - 1) {
                ui.setOpacity(255);
            }
            if (!isCover) {
                isCover = ui.cover;
            } else {
                ui.setOpacity(0);
            }
        }
    }

    /** 切换场景后清除资源 */
    private clear() {
        for (let name in this.uiDict) {
            let ui = this.uiDict[name];
            if (ui?.isValid) {
                ui.node.destroy();
            }
        }
        if (this.shade?.isValid) {
            this.shade.destroy();
        }
        this.uiDict = {};
        this.uiStack = [];
        this.cooldown = false;
    }

}

export enum EUIName {//字符串值为ui加载路径
    UIShade = "ui/shade",
    UIGuide = "ui/UIGuide",
    UITipMessage = "ui/UITipMessage",
    UI1 = "ui/ui1",
    UI2 = "ui/ui2",
    UI3 = "ui/ui3",
    UI4 = "ui/ui4",
}
