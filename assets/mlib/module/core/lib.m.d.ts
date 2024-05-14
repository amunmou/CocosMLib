import "cc";
import { App } from "../../App";
import { MLogger } from "../logger/MLogger";

//扩展CC中的一些类
declare module "cc" {
    interface Component extends CCObject {
        /** 
         * 从任意父节点上获取组件
         * @param includeSlef 是否包含自身所在节点 默认为true
         */
        getComponentInParent<T extends Component>(classConstructor: new (...args: any[]) => T, includeSlef?: boolean);
    }

    export namespace sp {
        interface Skeleton {
            
        }
    }
}

declare global {

    /** 将属性注册到全局 */
    let registerToGlobal: (key: string, value: any) => void;
    /** 应用程序管理单例 */
    let app: App;
    /** 日志打印类 */
    let logger: typeof MLogger;

    interface Array<T> {
        /**
         * 从数组中删除一个元素
         */
        delete<T>(item: T): boolean;
        /**
         * 从数组中删除一个元素
         */
        delete<T>(predicate: (value: T, index: number, obj: T[]) => boolean): boolean;
        /**
         * 获取第一个元素
         */
        first(): T;
        /** 
         * 获取最后一个元素
         */
        last(): T;
        /**
         * 数组随机打乱
         */
        disarrange();
    }

    interface String {
        /**
         * 首字母大写
         */
        upperFirst(): string;
        /**
         * 首字母小写 
         */
        lowerFirst(): string;
    }
}