import "cc";
import { App } from "../../App";
import { MLogger } from "../logger/MLogger";

//扩展CC中的一些类
declare module "cc" {
    interface Component {
        /** 
         * 从任意父节点上获取组件
         * @param includeSlef 是否包含自身所在节点 默认为true
         */
        getComponentInParent<T extends Component>(classConstructor: new (...args: any[]) => T, includeSlef?: boolean);
    }

    interface Node {
        /** 获取节点在场景树的路径 */
        getPath(): void;
        /** 根据zIndex的值更新子节点的SiblingIndex */
        regularSiblingIndex(): void;
        /** 模拟2.x中zIndex,刷新层级需要调用父节点的regularSiblingIndex方法 */
        zIndex: number;
        /** 在子节点zIndex值改变时修改父节点此属性为true，表示需要更新子节点的SiblingIndex */
        childrenSiblingIndexDirty: boolean;
    }
}

declare global {

    /** 应用程序管理单例 */
    const app: App;
    /** 日志打印类 */
    const logger: typeof MLogger;

    /**
     * @deprecated TMD这是DOM的Node,不要使用它
     */
    interface Node { }

    /**
     * @deprecated TMD这是DOM的Animation,不要使用它
     */
    interface Animation { }

    interface Array<T> {
        /**
        * 第一个元素
        */
        get first(): T | undefined;
        /** 
         * 最后一个元素
         */
        get last(): T | undefined;
        /**
         * 从数组中删除一个元素
         */
        delete<T>(item: T): boolean;
        /**
         * 从数组中删除一个元素
         */
        delete<T>(predicate: (value: T, index: number, obj: T[]) => boolean): boolean;
        /**
        * 从数组中随机返回一个值，并将它从数组中移除
        */
        random(): T | undefined;
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