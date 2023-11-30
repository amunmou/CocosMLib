import { MLogger } from "../module/logger/MLogger";

/**
 * 常用的一些方法工具类
 */
export class Utils {

    /** 获取日期(格式:20220101) 默认获取当天日期 */
    static getDate(timeMS?: number) {
        let lt10 = (v: number) => {
            return v < 10 ? "0" + v : v.toString();
        }
        let date = timeMS >= 0 ? new Date(timeMS) : new Date();
        let str = date.getFullYear() + lt10(date.getMonth() + 1) + lt10(date.getDate());
        return parseInt(str);
    }

    /**
     * 计算两个日期的天数差 日期格式20200101
     */
    static deltaDay(date1: number, date2: number) {
        let d1 = new Date();
        d1.setFullYear(Math.floor(date1 / 10000), Math.floor(date1 % 10000 / 100) - 1, date1 % 100);
        d1.setHours(0, 0, 0, 0);
        let d2 = new Date();
        d2.setFullYear(Math.floor(date2 / 10000), Math.floor(date2 % 10000 / 100) - 1, date2 % 100);
        d2.setHours(0, 0, 0, 0);
        let days = Math.abs(d1.getTime() - d2.getTime()) / (24 * 60 * 60 * 1000);
        return Math.floor(days);
    }

    /**
    * 将剩余时间(毫秒)转化为时分秒格式
    * @param timeMS 倒计时的时间
    * @param format hh:时 mm:分 ss:秒
    * @returns 格式化的字符串 hh:mm:ss 返回 00:30:30
    */
    static formatCountdown(timeMS: number, format: string) {
        let lt10 = (v: number) => {
            return v < 10 ? "0" + v : v.toString();
        }
        timeMS = Math.floor(timeMS / 1000);
        let hours = Math.floor(timeMS / 3600);
        let minutes = Math.floor((timeMS - hours * 3600) / 60);
        let seconds = timeMS - hours * 3600 - minutes * 60;
        format = format.replace("hh", lt10(hours));
        format = format.replace("mm", lt10(minutes));
        format = format.replace("ss", lt10(seconds));
        return format;
    }


    /**
     * 返回一个格式化的时间字符串
     * @param format 占位符 YYYY:年 MM:月 DD:日 hh:时 mm:分 ss:秒
     * @returns 格式化的字符串 例 YYYY-MM-DD hh:mm:ss 返回 2022-01-01 12:30:30
     */
    static formatTime(format: string, date?: Date) {
        if (date == undefined) {
            date = new Date();
        }
        let lt10 = (v: number) => {
            return v < 10 ? "0" + v : v.toString();
        }
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        format = format.replace("YYYY", year.toString());
        format = format.replace("MM", lt10(month));
        format = format.replace("DD", lt10(day));
        format = format.replace("hh", lt10(hour));
        format = format.replace("mm", lt10(minute));
        format = format.replace("ss", lt10(second));
        return format;
    }

    /**
     * 将比较大的数字用K,M,B,T来显示
     * @param fractionDigits 保留小数位数
     * @param canEndWithZero 是否需要用0填补小数位数 默认为false
     */
    static formatNum(value: number, fractionDigits: number, canEndWithZero = false) {
        let prefix = value >= 0 ? "" : "-";
        let v = "";
        let suffix = "";
        value = Math.abs(value);
        if (value >= 0 && value < Math.pow(10, 3)) {
            v = this.fixFloat(value, fractionDigits, canEndWithZero);
        } else if (value >= Math.pow(10, 3) && value < Math.pow(10, 6)) {
            v = this.fixFloat(value / Math.pow(10, 3), fractionDigits, canEndWithZero);
            suffix = "K";
        } else if (value >= Math.pow(10, 6) && value < Math.pow(10, 9)) {
            v = this.fixFloat(value / Math.pow(10, 6), fractionDigits, canEndWithZero);
            suffix = "M";
        }
        else if (value >= Math.pow(10, 9) && value < Math.pow(10, 12)) {
            v = this.fixFloat(value / Math.pow(10, 9), fractionDigits, canEndWithZero);
            suffix = "B";
        } else {
            v = this.fixFloat(value / Math.pow(10, 12), fractionDigits, canEndWithZero);
            suffix = "T";
        }
        return prefix + v + suffix;
    }


    static splitString(str: string, sep = ","): number[] {
        let arr: number[] = [];
        let sArr = str.trim().split(sep);
        for (const s of sArr) {
            let v = parseFloat(s);
            if (!isNaN(v)) arr.push(v);
        }
        return arr;
    }

    static splitStrings(strs: string, sep1 = ";", sep2 = ","): number[][] {
        let arr: number[][] = [];
        let sArr = strs.trim().split(sep1);
        for (const s of sArr) {
            if (s.trim()) {
                arr.push(this.splitString(s));
            }
        }
        return arr;
    }

    /**
     * 获取一个随机数，区间[min,max]
     * @param min 最小值
     * @param max 最大值
     * @param isInteger 是否是整数 默认true
     */
    static randomNum(min: number, max: number, isInteger = true) {
        let delta = max - min;
        let value = Math.random() * delta + min;
        if (isInteger) {
            value = Math.round(value);
        }
        return value;
    }

    /**
    *  修正小数位数
    * @param fractionDigits 保留小数位数
    * @param canEndWithZero 是否需要用0填补小数位数 默认为false
    */
    static fixFloat(value: number, fractionDigits: number, canEndWithZero = false) {
        if (fractionDigits < 0) fractionDigits = 0;
        let str = value.toFixed(fractionDigits);
        if (canEndWithZero) {
            return str;
        } else {
            while (true) {
                if (str.length > 1 && str.includes(".")) {
                    if (str.endsWith("0") || str.endsWith(".")) {
                        str = str.substring(0, str.length - 1);
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
        return str;
    }

    /** 从list中随机出一个值 */
    public static randomValue<T>(list: T[]) {
        let arr = this.randomValueByWeight(list, 1, v => 1);
        if (arr.length > 0) return arr[0];
        return null;
    }

    /**
     * 从带权重的集合中随机获取指定数量的元素
     * @param list 集合
     * @param weight 获取item权重的方法
     * @param num 返回item数量
     * @param canRepeat item是否可以重复
     * @returns 
     */
    public static randomValueByWeight<T>(list: T[], num = 1, weight?: (item: T) => number, canRepeat = false) {
        let result: T[] = [];
        if (!list || list.length == 0) return result;
        if (list.length < num) MLogger.warn("需要返回的item数量大于集合长度");
        if (!weight) weight = (item: T) => 1;

        let count: number = Math.min(list.length, num);
        let totalWeight = 0;

        for (const item of list) {
            totalWeight += weight(item);
        }

        while (result.length < count) {
            let randomV = Math.floor(Math.random() * totalWeight);;
            let tmpWeight = 0;

            for (const item of list) {
                let w = weight(item);
                if (randomV >= tmpWeight && randomV < tmpWeight + w) {
                    if (!canRepeat) //检查是否重复元素
                    {
                        var index = result.indexOf(item);
                        if (index == -1) result.push(item);
                        else break;
                    }
                    else {
                        result.push(item);
                    }
                }

                tmpWeight += w;
            }
        }
        return result;
    }
    /**
     * 格式化字符串,用args的内容替换str中的{i},i从0开始
     */
    static formatString(str: string, ...args: any[]) {
        args.forEach((v, i) => {
            str = str.replace(`{${i}}`, v);
        });
        return str;
    }

    /**
     * 裁剪前后指定的字符
     */
    static trim(source: string, ...strs: string[]) {
        if (!source) return source;
        if (strs.length == 0) return source.trim();
        for (const str of strs) {
            while (source.startsWith(str)) {
                source = source.substring(str.length);
            }
            while (source.endsWith(str)) {
                source = source.substring(0, source.length - str.length);
            }
        }
        return source;
    }

    static upperFirst(source: string) {
        if (!source) return source;
        if (source.length < 2) return source.toUpperCase();
        return source[0].toUpperCase() + source.substring(1);
    }

    static lowerFirst(source: string) {
        if (!source) return source;
        if (source.length < 2) return source.toLowerCase();
        return source[0].toLowerCase() + source.substring(1);
    }

    static delItemFromArray<T>(arr: T[], ...item: T[]) {
        if (arr.length > 0 && item.length > 0) {
            item.forEach(v => {
                let index = arr.indexOf(v);
                if (index > -1) {
                    arr.splice(index, 1);
                }
            })
        }
    }

    /** 统计元素在数组中出现次数 */
    static countValueTimes<T>(arr: T[], predicate: (value: T) => boolean) {
        let times = 0;
        arr.forEach(v => {
            if (predicate(v)) {
                times++;
            }
        })
        return times;
    }

    /** 生成UUID */
    static genUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0;
            let v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /** 迭代器转化为数组 */
    static iterator2Array<T>(iterator: IterableIterator<T>) {
        let result: T[] = [];
        for (let iter = iterator.next(); !iter.done; iter = iterator.next()) {
            result.push(iter.value);
        }
        return result;
    }

    /**
     * 随机打乱数组
     * @param arr 
     * @returns 
     */
    static disOriginArr(arr: number[]) {
        let len = arr.length;
        while (len) {
            let index = Math.floor(Math.random() * (len--));
            let temp = arr[index];
            arr[len] = arr[index];
            arr[index] = temp;
        }
        return arr;
    }
}