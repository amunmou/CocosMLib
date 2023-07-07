import { Enum, sys } from 'cc';
import { ShopUtil } from '../../script/base/ShopUtil';
import { LoginArgs, RequestIAPArgs, SDKCallback, ShowRewardVideoArgs } from '../sdk/MSDKWrapper';
import { Utils } from '../utils/Utils';
import { UITipMsg } from '../../script/ui/base/UITipMsg';

export const EChannel = Enum({
    Debug: 0,
    GooglePlay: 1,
});



export abstract class IChannel {
    abstract initSDK();

    abstract initEvent();

    /** 初始化内购 */
    abstract initIAP();
    /** 登录 */
    abstract login(args: LoginArgs);
    /** 展示激励视频 */
    abstract showRewardVideo(args: ShowRewardVideoArgs);
    /** 展示插屏 */
    abstract showInterstitial(arg?: string);
    /** 发起内购 */
    abstract requestIAP(args: RequestIAPArgs);
    /** 查询漏单 */
    abstract queryIAP();
    /** 恢复非消耗品内购 */
    abstract restoreIAP();
    /** 上报事件 */
    abstract reportEvent(eventName: string, ...args: any[]);
    /** 上报事件 每天一次(本地存档卸载失效)*/
    abstract reportEventDaily(eventName: string, ...args: any[]);
    /** 上报事件 终生一次(本地存档卸载失效)*/
    abstract reportEventLifetime(eventName: string, ...args: any[]);
    /** 额外的方法 用于一些特殊的处理 */
    abstract extraMethod(key: string, ...args: any[])
}

export class Channel implements IChannel {
    initSDK() {


    }
    initEvent() {

    }

    initIAP() {
        ShopUtil.initPurchase();
    }

    login(args: LoginArgs) {
        SDKCallback.login = args;
        SDKCallback.login.success("666666");
    }

    showRewardVideo(args: ShowRewardVideoArgs) {
        SDKCallback.rewardVideo = args;
        args.success && args.success();
        SDKCallback.rewardVideoDefault?.success && SDKCallback.rewardVideoDefault?.success();
        UITipMsg.Inst.showToast("测试环境 直接看广告成功!");
    }

    showInterstitial(extParam?: string) {

    }

    requestIAP(args: RequestIAPArgs) {
        SDKCallback.inAppPurchase.success(args.id);
        UITipMsg.Inst.showToast("测试环境 直接内购成功!");
    }


    queryIAP() {

    }

    restoreIAP() {

    }

    reportEvent(eventName: string, ...args: any[]) {

    }

    reportEventDaily(eventName: string, ...args: any[]) {
        let k = eventName + "_daily";
        if (Channel.isValidDailyEvent(k, ...args)) this.reportEvent(k, ...args);
    }

    reportEventLifetime(eventName: string, ...args: any[]) {
        let k = eventName + "_lifetime";
        if (Channel.isValidLifetimeEvent(k, ...args)) this.reportEvent(k, ...args);
    }


    extraMethod(key: string, ...args: any[]) {

    }


    public static getInstance(platformId: number): IChannel {
        // if (sys.platform == sys.Platform.ANDROID && platformId == EChannel.GooglePlay) {
        //     return new WeChatMini();
        // }
        return new Channel();
    }

    public static isValidDailyEvent(eventName: string, ...args: any[]) {
        let today = parseFloat(Utils.formatTime("YYYYMMDD"));
        let key = eventName + "_" + args.join("|");
        let i = parseFloat(sys.localStorage.getItem(key));
        if (isNaN(i) || i < today) {
            sys.localStorage.setItem(key, today.toString())
            return true;
        }
        return false;
    }

    public static isValidLifetimeEvent(eventName: string, ...args: any[]) {
        let today = parseFloat(Utils.formatTime("YYYYMMDD"));
        let key = eventName + "_" + args.join("|");
        let i = parseFloat(sys.localStorage.getItem(key));
        if (isNaN(i)) {
            sys.localStorage.setItem(key, today.toString())
            return true;
        }
        return false;
    }
}
