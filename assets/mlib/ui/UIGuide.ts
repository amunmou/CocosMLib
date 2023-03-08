import { EventTouch, find, Label, Node, NodeEventType, Rect, Tween, tween, UITransform, v3, _decorator } from 'cc';
const { ccclass, property } = _decorator;

import { Guide } from "../../script/game/DataEntity";
import { app } from "../App";
import { UIKey, UIMgr } from "../manager/UIMgr";
import { UIBase } from "./UIBase";

const guideTestData: Guide[] = [
    { ID: 1, GuideID: 1, UIName: "UIGuideTest1", NodePath: "step1", ShowBtnNode: true, FingerDir: 1, TipText: "", TipPos: [0, 0], ClickScreen: false },
    { ID: 2, GuideID: 1, UIName: "UIGuideTest1", NodePath: "step2", ShowBtnNode: true, FingerDir: 1, TipText: "", TipPos: [0, 0], ClickScreen: false },
    { ID: 3, GuideID: 1, UIName: "UIGuideTest1", NodePath: "step3", ShowBtnNode: true, FingerDir: 1, TipText: "", TipPos: [0, 0], ClickScreen: false },
    { ID: 4, GuideID: 1, UIName: "UIGuideTest1", NodePath: "step4", ShowBtnNode: true, FingerDir: 1, TipText: "", TipPos: [0, 0], ClickScreen: false },
    { ID: 5, GuideID: 1, UIName: "UIGuideTest2", NodePath: "step5", ShowBtnNode: true, FingerDir: 1, TipText: "", TipPos: [0, 0], ClickScreen: false },
]

@ccclass('UIGuide')
export class UIGuide extends UIBase {

    @property(Node)
    mask!: Node;
    @property(Node)
    shade!: Node;
    @property(Node)
    btnScreen!: Node;
    @property(Node)
    tip!: Node;
    @property(Node)
    finger!: Node;

    wait = false;
    guideId: number = 0;
    guideData: Guide[] = [];
    cbFinish: Function = null!;
    stepFunc: ((ui: UIBase) => Node)[] = null!;

    onLoad() {
        this.hide();
        this.shade.on(NodeEventType.TOUCH_START, this.onShadeTouchStart, this);
        // this.shade["_eventProcessor"]["touchListener"]["swallowTouches"] = false;
        console.log(this.shade);

    }

    hide() {
        this.node.active = false;
        this.wait = false;
        this.mask.active = false;
        this.btnScreen.active = false;
        this.tip.active = false;
        this.finger.active = false;

    }

    guideOver() {
        this.guideId = 0;
        this.cbFinish && this.cbFinish();
        this.cbFinish = null!;
        this.stepFunc = null!;
        this.hide();
    }

    onShadeTouchStart(evt: EventTouch) {
        let size = this.mask.getComponent(UITransform)!.contentSize;
        let touchPos = evt.touch!.getLocation();
        let rect = new Rect(this.mask.worldPosition.x - size.width / 2, this.mask.worldPosition.y - size.height / 2, size.width, size.height);
        console.log(rect, this.mask.worldPosition, touchPos);
        if (!rect.contains(touchPos)) {
            evt.propagationImmediateStopped = true;
        }
    }

    public startGuide(guideId: number, cbFinish?: Function, stepFunc?: ((ui: UIBase) => Node)[]) {
        if (this.guideId != 0) {
            console.warn("正在进引导: ", this.guideId, " 想要开始引导: ", guideId);
            return;
        }
        this.node.active = true;
        this.guideId = guideId;
        // this.guideData = DataManager.Inst.getGuideData(guideId);
        this.guideData = guideTestData;
        if (this.guideData.length > 0) {
            this.cbFinish = cbFinish!;
            this.stepFunc = stepFunc!;
            this.showGuideStep(0);
        } else {
            console.error(`引导${this.guideId}数据错误`);
        }
    }

    public bindGuideBtnEvent(index: number, uiData: UIBase) {
        let guide = this.guideData[index];
        let btnNode = null;
        if (guide.NodePath == "Function") {
            if (this.stepFunc?.length > 0) {
                btnNode = this.stepFunc.shift()!(uiData);
            } else {
                console.error(`引导${this.guideId} 第${index}步 未传入stepFunc`);
                return;
            }
        } else {
            btnNode = find(guide.NodePath.trim(), uiData.node);
        }
        if (btnNode) {
            this.showGuideBtn(btnNode, index);
        } else {
            console.error(`引导${this.guideId} 第${index}步 未找到指定node`);
            return;
        }
    }

    public showGuideBtn(btnNode: Node, index: number) {
        let guide = this.guideData[index];
        if (guide.ShowBtnNode) {
            this.mask.active = true;
            Tween.stopAllByTarget(this.mask);
            let btnTransform = btnNode.getComponent(UITransform)!;
            let maskTransform = this.mask.getComponent(UITransform)!;
            let pos = this.transform.convertToNodeSpaceAR(btnTransform.convertToWorldSpaceAR(v3(0, 0)));
            Tween.stopAllByTarget(this.mask);
            Tween.stopAllByTarget(maskTransform);
            this.block.active = true;
            tween(this.mask).to(0.25, { position: pos }).call(() => { this.block.active = false; }).start();
            tween(maskTransform).to(0.25, { width: btnTransform.width, height: btnTransform.height }).start();
            btnNode.once("click", () => {
                this.onClickGuideBtn(index);
            });
        } else {
            this.mask.active = false;
        }
        this.showFinger(guide.FingerDir, btnNode);
    }

    public onClickGuideBtn(index: number) {
        this.finger.active = false;
        if (index < this.guideData.length) {
            if (index == this.guideData.length - 1) {
                this.guideOver();
            } else {
                this.showGuideStep(index + 1);
            }
        }
    }

    public showGuideStep(index: number) {
        let guide = this.guideData[index];
        if (!guide) {
            console.error(`引导${this.guideId} 第${index}步 数据错误`);
            return;
        }
        let show = (uiData: UIBase) => {
            if (guide.UIName && guide.NodePath) {
                this.bindGuideBtnEvent(index, uiData);
            } else {
                this.finger.active = false;
            }
            if (guide.ClickScreen) {
                this.btnScreen.active = true;
                this.btnScreen.once("click", () => {
                    this.btnScreen.active = false;
                    if (index < this.guideData.length) {
                        if (index == this.guideData.length - 1) {
                            this.guideOver();
                        } else {
                            this.showGuideStep(index + 1);
                        }
                    }
                });
            }
            this.showTip(guide.TipText, guide.TipPos);
        }

        if (UIMgr.Inst.isTopUI((UIKey as any)[guide.UIName])) {
            let ui = UIMgr.Inst.getUI((UIKey as any)[guide.UIName]);
            if (ui) {
                this.scheduleOnce(() => {
                    show(ui!);
                })
            }
        } else {
            let func = () => {
                app.event.once(app.eventKey.OnUIShow, (uiData: UIBase) => {
                    if (uiData.uiName == (UIKey as any)[guide.UIName]) {
                        if (this.wait) {
                            func();
                        } else {
                            this.scheduleOnce(() => {
                                show(uiData);
                            })
                        }
                    }
                });
            }
            func();
        }
    }


    showFinger(dir: number, btnNode: Node) {
        if (dir == 0) {
            this.finger.active = false;
        } else {
            this.finger.active = true;
            let btnTransform = btnNode.getComponent(UITransform)!;
            let pos = this.transform.convertToNodeSpaceAR(btnTransform.convertToWorldSpaceAR(v3(0, 0)));
            switch (dir) {
                case 1://上
                    this.finger.angle = 180;
                    this.finger.position = v3(pos.x, pos.y - btnTransform.height / 2);
                    break;
                case 2://下
                    this.finger.angle = 0;
                    this.finger.position = v3(pos.x, pos.y + btnTransform.height / 2);
                    break;
                case 3://左
                    this.finger.angle = 90;
                    this.finger.position = v3(pos.x + btnTransform.width / 2, pos.y);
                    break;
                case 4://右
                    this.finger.angle = -90;
                    this.finger.position = v3(pos.x - btnTransform.width / 2, pos.y);
                    break;
                default:
                    console.error("finger dir错误");
            }
        }
    }

    showTip(text: string, pos: number[]) {
        if (text == "") {
            this.tip.active = false;
        } else {
            this.tip.active = true;
            this.tip.position = v3(pos[0], pos[1]);
            let label = this.tip.getComponentInChildren(Label)!;
            label.string = text;
        }
    }
}