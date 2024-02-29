import { _decorator, Component, EventKeyboard, EventMouse, Input, input } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GMListener')
export class GMListener extends Component {

    private _fiveFingerTime = 3;
    private _fiveFingerTimeDt = 0;

    private _isOpenGM = false;

    protected onLoad(): void {
        input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    private onMouseDown(e: EventMouse) {
        let code = e.getButton()
        console.log("onMouseDown", code);
        if (code == 1) {//按下鼠标滚轮
            this.openGMPannel();
        }
    }

    private onKeyDown(e: EventKeyboard) {
        let code = e.keyCode;
        console.log("onKeyDown", code);
    }

    private reset() {
        this._fiveFingerTimeDt = 0;
        this._isOpenGM = false;
    }

    private openGMPannel() {
        // App.ui.show(UIConstant.UIGM);
    }

    protected update(deltaTime: number) {
        if (input.getTouchCount() >= 5) {
            this._fiveFingerTimeDt += deltaTime;
            if (this._fiveFingerTimeDt >= this._fiveFingerTime) {
                if (this._isOpenGM) return;
                this.openGMPannel();
                this._isOpenGM = true;
            }
        } else {
            this.reset();
        }

    }
}


