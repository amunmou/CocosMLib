import { Tween } from "cc";
import { TimerObject } from "./TimerObject";
import { TweenAction } from "cc";

export class TimerTween<T = any> extends TimerObject<Tween<T>> {

    private get finalAction(): TweenAction { return this._target['_finalAction']; };

    public constructor(tween: Tween<T>) {
        super();
        this._target = tween;
        if (!this.finalAction) this._target.start();
        this.selfTimeScale = this.finalAction.getSpeed();
        this.groupTimeScale = 1;
    }

    public isValid() {
        return this.finalAction && !this.finalAction.isDone();
    }

    protected updateTimeScale(): void {
        this.finalAction.setSpeed(this.selfTimeScale * this.groupTimeScale);
    }

}