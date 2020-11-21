import { Utils } from "./Utils";

interface StroageItem {
    k: string,//本地存储key
    v: any//默认值
}
/**
 * 本地存储对象
 */
export const StroageDict = {
    LastResetDate: { k: "LastResetDate", v: 0 }
}

/**
 * 本地存储工具类
 */
export class StroageMgr {
    private static inst: StroageMgr = null;
    public static get Inst() { return this.inst || (this.inst = new this()) }
    private constructor() {
        if (Utils.getToday() > this.getNumber(StroageDict.LastResetDate)) {
            this.setValue(StroageDict.LastResetDate, Utils.getToday());
            //在这里重置一些需要每日重置的值
        }
    }
    /**
     * 获取number类型的本地存储值
     */
    getNumber(stroageItem: StroageItem): number {
        let value = parseFloat(cc.sys.localStorage.getItem(stroageItem.k));
        return isNaN(value) ? stroageItem.v : value;
    }

    /**
     * 获取string类型的本地存储值
     */
    getString(stroageItem: StroageItem): string {
        let value = cc.sys.localStorage.getItem(stroageItem.k);
        if (value) {
            return value;
        }
        return stroageItem.v;
    }

    /**
     * 获取boolean类型的本地存储值
     */
    getBoolean(stroageItem: StroageItem): boolean {
        let value = cc.sys.localStorage.getItem(stroageItem.k) + "";
        if (value != "true" && value != "false") {
            return stroageItem.v;
        } else {
            return value != "false";
        }
    }

    /**
     * 获取object类型的本地存储值
     */
    getObject(stroageItem: StroageItem): object {
        let value = cc.sys.localStorage.getItem(stroageItem.k);
        try {
            value = JSON.parse(value);
        } catch (err) {
            console.error(stroageItem.k, ": JSON.parse转化对象错误 ", value);
            value = stroageItem.v;
        }
        return value;
    }

    /**
     * 设置本地存储值
     */
    setValue(stroageItem: StroageItem, value: any) {
        if (typeof value === "object") {
            value = JSON.stringify(value);
        }
        cc.sys.localStorage.setItem(stroageItem.k, value);
    }

}