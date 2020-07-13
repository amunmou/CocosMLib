const { ccclass, property } = cc._decorator;

@ccclass
export default class ButtonAssist extends cc.Component {
    @property({
        displayName: "禁用默认音效",
        tooltip: "选中时，点击按钮不会播放默认音效"
    })
    disableDefault = true;
    @property({
        type: cc.AudioClip,
        displayName: "音效",
        tooltip: "当音效不为null时，点击按钮播放指定的音效",
        visible: function () { return this.disableDefault; }
    })
    audioClip: cc.AudioClip = null;
    @property({
        displayName: "冷却时间",
        tooltip: "点击按钮后，等待多长时间重新启用按钮，单位秒",
        min: 0
    })
    cooldown = 0;
    button: cc.Button = null;

    onLoad() {
        ButtonAssist.enableDefaultEffect();
        this.button = this.getComponent(cc.Button);
        if (this.button) {
            this.button["disableDefault"] = this.disableDefault;
            this.node.on("click", this.onClick, this);
        }
    }

    onClick() {
        if (this.disableDefault && this.audioClip) {
            console.log("playEffect");
        }
        this.button.interactable = false;
        this.scheduleOnce(() => {
            this.button.interactable = true;
        }, 2);
        console.log("Button Click");
    }

    /**
     * 修改原型，所有按钮点击时播放默认音效，不需要将该组件挂在节点上同样有效
     * 若需要禁用单个按钮默认音效 button["disableDefault"]=true
     */
    public static enableDefaultEffect() {
        cc.Button.prototype["_onTouchEnded"] = function (event) {
            if (!this.interactable || !this.enabledInHierarchy) return;
            if (this._pressed) {
                if (!this.disableDefault) {
                    console.log("playEffect");
                }
                cc.Component.EventHandler.emitEvents(this.clickEvents, event);
                this.node.emit('click', this);
            }
            this._pressed = false;
            this._updateState();
            event.stopPropagation();
        }
    }
}
