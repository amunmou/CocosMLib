import { _decorator } from "cc";
import { CCUtils } from "../../../utils/CCUtil";
import { MComponent } from "../../core/MComponent";
import { ReferenceCollector } from "../../core/ReferenceCollector";
import { MButton } from "../extend/MButton";

const { ccclass, requireComponent } = _decorator;

@ccclass("UIComponent")
@requireComponent(ReferenceCollector)
export class UIComponent extends MComponent {

    protected __preload(): void {
        super.__preload();
        this.getComponentsInChildren(MButton).forEach(v => {
            let root = CCUtils.getComponentInParent(v.node, UIComponent, true);
            if (root != this) return;//忽略其它UI组件所在节点下的按钮
            v.onClick.addListener(() => {
                this.onClickButton(v.node.name, v);
            });
        });
    }

    /** 向父节点第一个UIBase组件发送消息 */
    protected sendToUI(methodName: string, ...args: any[]) {
        this.sendMessageUpwards("UIBase", methodName, ...args);
    }

    /** 向父节点第一个UIComponent组件发送消息 */
    public sendToUIComponent(methodName: string, ...args: any[]) {
        this.sendMessageUpwards("UIComponent", methodName, ...args);
    }

    /** 自动为所有MButton注册一个点击事件 */
    protected onClickButton(btnName: string, btn: MButton) {

    }
}