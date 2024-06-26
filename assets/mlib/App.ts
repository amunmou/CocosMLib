import { Component, ResolutionPolicy, _decorator, director, js, view } from 'cc';
const { ccclass, property } = _decorator;

import { Publish } from '../scripts/base/publish/Publish';
import SDKSetting from '../scripts/base/publish/SDKSetting';
import { TipMsg } from '../scripts/base/tipmsg/TipMsg';
import { GameSetting } from './GameSetting';
import { AssetComponent } from './module/asset/AssetComponent';
import { AudioComponent } from "./module/audio/AudioComponent";
import { AudioMgr } from './module/audio/AudioMgr';
import { EventMgr } from "./module/event/EventMgr";
import { L10nMgr } from './module/l10n/L10nMgr';
import { PoolMgr } from "./module/pool/PoolMgr";
import { LocalStorage } from './module/stroage/LocalStorage';
import { TimerComponent } from './module/timer/TimerComponent';
import { UIMgr } from "./module/ui/manager/UIMgr";
import { Channel } from "./sdk/Channel";
import { SingletonFactory } from './utils/SingletonFactory';


/** 应用程序启动入口 */
@ccclass('App')
export class App extends Component {

    public chan: Channel;

    public timer: TimerComponent;
    public audio: AudioComponent;
    public asset: AssetComponent;
    public stroage = LocalStorage;
    public event = EventMgr;
    public pool = PoolMgr;
    public ui: UIMgr;
    public l10n = L10nMgr;
    public audioMgr = AudioMgr;
    public tipMsg = TipMsg;


    protected onLoad() {
        //@ts-ignore
        globalThis["app"] = this;
        director.addPersistRootNode(this.node);
        this.setCanvasResolution();
        //@ts-ignore
        this.timer = this.addComponent(TimerComponent);
        this.asset = this.addComponent(AssetComponent);
        this.audio = this.addComponent(AudioComponent);
        this.audio.setKey("App");

        this.chan = Publish.getChannelInstance();

        logger.print(`GameSetting Channel=${GameSetting.Inst.channel}|${js.getClassName(this.chan)} Version=${GameSetting.Inst.version} Language=${L10nMgr.lang}`);
        logger.print(`SDKSetting ${SDKSetting.Inst.getPrintInfo()}`);
    }

    protected start() {
        this.ui = UIMgr.Inst;
    }

    protected onDestroy(): void {
        SingletonFactory.clear();
        EventMgr.clear();
        PoolMgr.clear();
    }

    private setCanvasResolution() {
        let size = view.getVisibleSize();
        let min = Math.min(size.width, size.height);
        let max = Math.max(size.width, size.height);
        let ratio = max / min;
        if (size.width > size.height) {//横屏
            if (ratio > 1.77) {//手机
                view.setResolutionPolicy(ResolutionPolicy.FIXED_HEIGHT);
            } else {//平板
                view.setResolutionPolicy(ResolutionPolicy.FIXED_WIDTH);
            }
        } else {//竖屏
            if (ratio > 1.77) {//手机
                view.setResolutionPolicy(ResolutionPolicy.FIXED_WIDTH);
            } else {//平板
                view.setResolutionPolicy(ResolutionPolicy.FIXED_HEIGHT);
            }
        }
    }

    public getSingleInst<T>(clazz: { new(): T }) {
        return SingletonFactory.getInstance(clazz);
    }
}