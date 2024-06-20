//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------


export class Vector2 {
    static deserializeFromJson(json: any): Vector2 {
        let x = json.x
        let y = json.y
        if (x == null || y == null) {
            throw new Error()
        }
        return new Vector2(x, y)
    }

    x: number
    y: number
    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }
}

export class Vector3 {
    static deserializeFromJson(json: any): Vector3 {
        let x = json.x
        let y = json.y
        let z = json.z
        if (x == null || y == null || z == null) {
            throw new Error()
        }
        return new Vector3(x, y, z)
    }

    x: number
    y: number
    z: number

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x
        this.y = y
        this.z = z
    }
}

export class Vector4 {
    static deserializeFromJson(json: any): Vector4 {
        let x = json.x
        let y = json.y
        let z = json.z
        let w = json.w
        if (x == null || y == null || z == null || w == null) {
            throw new Error()
        }
        return new Vector4(x, y, z, w)
    }
    
    x: number
    y: number
    z: number
    w: number

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        this.x = x
        this.y = y
        this.z = z
        this.w = w
    }
}


export namespace test {
export enum ETestQuality {
    /**
     * 最高品质
     */
    A = 1,
    /**
     * 黑色的
     */
    B = 2,
    /**
     * 蓝色的
     */
    C = 3,
    /**
     * 最差品质
     */
    D = 4,
}
}

export namespace test {
export enum AccessFlag {
    WRITE = 1,
    READ = 2,
    TRUNCATE = 4,
    NEW = 8,
    READ_WRITE = WRITE|READ,
}
}


export class TbGlobalVar{

     private _data: GlobalVar
    constructor(_json_: any) {
        if (_json_.length != 1) throw new Error('table mode=one, but size != 1')
        this._data = new GlobalVar(_json_[0])
    }

    getData(): GlobalVar { return this._data; }

    /**
     * 传单每次点击次数
     */
     get  LeafletClickCnt(): number { return this._data.LeafletClickCnt; }
    /**
     * 传单次数恢复上限
     */
     get  LeafletCnt(): number { return this._data.LeafletCnt; }
    /**
     * 传单每恢复一次的时间：分
     */
     get  LeafletRecover(): number { return this._data.LeafletRecover; }
    /**
     * 乐队持续时间分;加速比例
     */
     get  BandBuff(): number[] { return this._data.BandBuff; }
    /**
     * 离线最小单位分、广告翻几倍、钻石翻几倍、要几颗钻石
     */
     get  OfflineData(): number[] { return this._data.OfflineData; }
    /**
     * 塔罗牌冷却时间：分
     */
     get  TarotCoolTime(): number { return this._data.TarotCoolTime; }
    /**
     * 鸡的移动速度，每秒像素单位
     */
     get  HeroMoveSpeed(): number { return this._data.HeroMoveSpeed; }
    /**
     * 小费出现的概率；小费占商品的比例
     */
     get  Gratuity(): number[] { return this._data.Gratuity; }
    /**
     * 特殊顾客冷却时间区间：分(进入游戏时和特殊客人离开时计算)
     */
     get  SpecialCustomersCoolTime(): number[] { return this._data.SpecialCustomersCoolTime; }
    /**
     * 初始道具,数量
     */
     get  InitialItem(): string { return this._data.InitialItem; }

    resolve(_tables: Map<string, any>) {
        this._data.resolve(_tables)
    }

    
}





export class GlobalVar {

    constructor(_json_: any) {
        if (_json_.LeafletClickCnt === undefined) { throw new Error() }
        this.LeafletClickCnt = _json_.LeafletClickCnt
        if (_json_.LeafletCnt === undefined) { throw new Error() }
        this.LeafletCnt = _json_.LeafletCnt
        if (_json_.LeafletRecover === undefined) { throw new Error() }
        this.LeafletRecover = _json_.LeafletRecover
        if (_json_.BandBuff === undefined) { throw new Error() }
        this.BandBuff = _json_.BandBuff
        if (_json_.OfflineData === undefined) { throw new Error() }
        this.OfflineData = _json_.OfflineData
        if (_json_.TarotCoolTime === undefined) { throw new Error() }
        this.TarotCoolTime = _json_.TarotCoolTime
        if (_json_.HeroMoveSpeed === undefined) { throw new Error() }
        this.HeroMoveSpeed = _json_.HeroMoveSpeed
        if (_json_.Gratuity === undefined) { throw new Error() }
        this.Gratuity = _json_.Gratuity
        if (_json_.SpecialCustomersCoolTime === undefined) { throw new Error() }
        this.SpecialCustomersCoolTime = _json_.SpecialCustomersCoolTime
        if (_json_.InitialItem === undefined) { throw new Error() }
        this.InitialItem = _json_.InitialItem
    }

    /**
     * 传单每次点击次数
     */
    readonly LeafletClickCnt: number
    /**
     * 传单次数恢复上限
     */
    readonly LeafletCnt: number
    /**
     * 传单每恢复一次的时间：分
     */
    readonly LeafletRecover: number
    /**
     * 乐队持续时间分;加速比例
     */
    readonly BandBuff: number[]
    /**
     * 离线最小单位分、广告翻几倍、钻石翻几倍、要几颗钻石
     */
    readonly OfflineData: number[]
    /**
     * 塔罗牌冷却时间：分
     */
    readonly TarotCoolTime: number
    /**
     * 鸡的移动速度，每秒像素单位
     */
    readonly HeroMoveSpeed: number
    /**
     * 小费出现的概率；小费占商品的比例
     */
    readonly Gratuity: number[]
    /**
     * 特殊顾客冷却时间区间：分(进入游戏时和特殊客人离开时计算)
     */
    readonly SpecialCustomersCoolTime: number[]
    /**
     * 初始道具,数量
     */
    readonly InitialItem: string

    resolve(_tables: Map<string, any>) {
    }
}




export class TbGuide{
    private _dataMap: Map<number, TGuide>
    private _dataList: TGuide[]
    constructor(_json_: any) {
        this._dataMap = new Map<number, TGuide>()
        this._dataList = []
        for(var _json2_ of _json_) {
            let _v: TGuide
            _v = new TGuide(_json2_)
            this._dataList.push(_v)
            this._dataMap.set(_v.ID, _v)
        }
    }

    getDataMap(): Map<number, TGuide> { return this._dataMap; }
    getDataList(): TGuide[] { return this._dataList; }

    get(key: number): TGuide | undefined { return this._dataMap.get(key); }

    resolve(_tables: Map<string, any>) {
        for(var v of this._dataList) {
            v.resolve(_tables)
        }
    }

}





export class TGuide {

    constructor(_json_: any) {
        if (_json_.ID === undefined) { throw new Error() }
        this.ID = _json_.ID
        if (_json_.GuideID === undefined) { throw new Error() }
        this.GuideID = _json_.GuideID
        if (_json_.StepKey === undefined) { throw new Error() }
        this.StepKey = _json_.StepKey
        if (_json_.UIName === undefined) { throw new Error() }
        this.UIName = _json_.UIName
        if (_json_.NodePath === undefined) { throw new Error() }
        this.NodePath = _json_.NodePath
        if (_json_.NodeSize === undefined) { throw new Error() }
        this.NodeSize = Vector2.deserializeFromJson(_json_.NodeSize)
        if (_json_.DelayCheckUI === undefined) { throw new Error() }
        this.DelayCheckUI = _json_.DelayCheckUI
        if (_json_.ClickScreen === undefined) { throw new Error() }
        this.ClickScreen = _json_.ClickScreen
        if (_json_.Opacity === undefined) { throw new Error() }
        this.Opacity = _json_.Opacity
        if (_json_.HollowType === undefined) { throw new Error() }
        this.HollowType = _json_.HollowType
        if (_json_.HollowScale === undefined) { throw new Error() }
        this.HollowScale = _json_.HollowScale
        if (_json_.RingScale === undefined) { throw new Error() }
        this.RingScale = _json_.RingScale
        if (_json_.RingOffset === undefined) { throw new Error() }
        this.RingOffset = Vector2.deserializeFromJson(_json_.RingOffset)
        if (_json_.FingerDir === undefined) { throw new Error() }
        this.FingerDir = _json_.FingerDir
        if (_json_.FingerOffset === undefined) { throw new Error() }
        this.FingerOffset = Vector2.deserializeFromJson(_json_.FingerOffset)
        if (_json_.TipText === undefined) { throw new Error() }
        this.TipText = _json_.TipText
        if (_json_.TipPos === undefined) { throw new Error() }
        this.TipPos = Vector2.deserializeFromJson(_json_.TipPos)
        if (_json_.Prefab === undefined) { throw new Error() }
        this.Prefab = _json_.Prefab
    }

    /**
     * 主键
     */
    readonly ID: number
    /**
     * 引导ID
     */
    readonly GuideID: number
    /**
     * 步骤Key
     */
    readonly StepKey: number
    /**
     * 节点所在UI名字
     */
    readonly UIName: string
    /**
     * 节点在UI中的路径
     */
    readonly NodePath: string
    /**
     * 指定尺寸
     */
    readonly NodeSize: Vector2
    /**
     * 延迟检测
     */
    readonly DelayCheckUI: number
    /**
     * 点击屏幕即完成引导
     */
    readonly ClickScreen: boolean
    /**
     * 遮罩透明度
     */
    readonly Opacity: number
    /**
     * 挖孔类型
     */
    readonly HollowType: number
    /**
     * 挖孔缩放
     */
    readonly HollowScale: number
    /**
     * 圆圈缩放
     */
    readonly RingScale: number
    /**
     * 圆圈相对挖孔偏移
     */
    readonly RingOffset: Vector2
    /**
     * 手指方向
     */
    readonly FingerDir: number
    /**
     * 手指相对挖孔偏移
     */
    readonly FingerOffset: Vector2
    /**
     * 提示文字
     */
    readonly TipText: string
    /**
     * 提示文字位置
     */
    readonly TipPos: Vector2
    /**
     * 加载预制体
     */
    readonly Prefab: string

    resolve(_tables: Map<string, any>) {
    }
}




export class TbUnforcedGuide{
    private _dataMap: Map<number, TUnforcedGuide>
    private _dataList: TUnforcedGuide[]
    constructor(_json_: any) {
        this._dataMap = new Map<number, TUnforcedGuide>()
        this._dataList = []
        for(var _json2_ of _json_) {
            let _v: TUnforcedGuide
            _v = new TUnforcedGuide(_json2_)
            this._dataList.push(_v)
            this._dataMap.set(_v.ID, _v)
        }
    }

    getDataMap(): Map<number, TUnforcedGuide> { return this._dataMap; }
    getDataList(): TUnforcedGuide[] { return this._dataList; }

    get(key: number): TUnforcedGuide | undefined { return this._dataMap.get(key); }

    resolve(_tables: Map<string, any>) {
        for(var v of this._dataList) {
            v.resolve(_tables)
        }
    }

}





export class TUnforcedGuide {

    constructor(_json_: any) {
        if (_json_.ID === undefined) { throw new Error() }
        this.ID = _json_.ID
        if (_json_.GuideID === undefined) { throw new Error() }
        this.GuideID = _json_.GuideID
        if (_json_.StepKey === undefined) { throw new Error() }
        this.StepKey = _json_.StepKey
        if (_json_.UIName === undefined) { throw new Error() }
        this.UIName = _json_.UIName
        if (_json_.NodePath === undefined) { throw new Error() }
        this.NodePath = _json_.NodePath
        if (_json_.FingerOffset === undefined) { throw new Error() }
        this.FingerOffset = Vector2.deserializeFromJson(_json_.FingerOffset)
    }

    /**
     * 主键
     */
    readonly ID: number
    /**
     * 引导ID
     */
    readonly GuideID: number
    /**
     * 步骤Key
     */
    readonly StepKey: number
    /**
     * 节点所在UI名字
     */
    readonly UIName: string
    /**
     * 节点在UI中的路径
     */
    readonly NodePath: string
    /**
     * 手指相对目标节点偏移
     */
    readonly FingerOffset: Vector2

    resolve(_tables: Map<string, any>) {
    }
}




export class TbGuideOpenPlan{
    private _dataMap: Map<number, TGuideOpenPlan>
    private _dataList: TGuideOpenPlan[]
    constructor(_json_: any) {
        this._dataMap = new Map<number, TGuideOpenPlan>()
        this._dataList = []
        for(var _json2_ of _json_) {
            let _v: TGuideOpenPlan
            _v = new TGuideOpenPlan(_json2_)
            this._dataList.push(_v)
            this._dataMap.set(_v.ID, _v)
        }
    }

    getDataMap(): Map<number, TGuideOpenPlan> { return this._dataMap; }
    getDataList(): TGuideOpenPlan[] { return this._dataList; }

    get(key: number): TGuideOpenPlan | undefined { return this._dataMap.get(key); }

    resolve(_tables: Map<string, any>) {
        for(var v of this._dataList) {
            v.resolve(_tables)
        }
    }

}





export class TGuideOpenPlan {

    constructor(_json_: any) {
        if (_json_.ID === undefined) { throw new Error() }
        this.ID = _json_.ID
        if (_json_.FuncOpenID === undefined) { throw new Error() }
        this.FuncOpenID = _json_.FuncOpenID
    }

    /**
     * 引导ID
     */
    readonly ID: number
    /**
     * 功能开启ID
     */
    readonly FuncOpenID: number

    resolve(_tables: Map<string, any>) {
    }
}




export class TbLocalization{
    private _dataMap: Map<string, TLocalization>
    private _dataList: TLocalization[]
    constructor(_json_: any) {
        this._dataMap = new Map<string, TLocalization>()
        this._dataList = []
        for(var _json2_ of _json_) {
            let _v: TLocalization
            _v = new TLocalization(_json2_)
            this._dataList.push(_v)
            this._dataMap.set(_v.key, _v)
        }
    }

    getDataMap(): Map<string, TLocalization> { return this._dataMap; }
    getDataList(): TLocalization[] { return this._dataList; }

    get(key: string): TLocalization | undefined { return this._dataMap.get(key); }

    resolve(_tables: Map<string, any>) {
        for(var v of this._dataList) {
            v.resolve(_tables)
        }
    }

}





export class TLocalization {

    constructor(_json_: any) {
        if (_json_.key === undefined) { throw new Error() }
        this.key = _json_.key
        if (_json_.sc === undefined) { throw new Error() }
        this.sc = _json_.sc
        if (_json_.tc === undefined) { throw new Error() }
        this.tc = _json_.tc
        if (_json_.en === undefined) { throw new Error() }
        this.en = _json_.en
    }

    /**
     * key
     */
    readonly key: string
    /**
     * 简体中文
     */
    readonly sc: string
    /**
     * 繁體中文
     */
    readonly tc: string
    /**
     * 英文
     */
    readonly en: string

    resolve(_tables: Map<string, any>) {
    }
}




type JsonLoader = (file: string) => any

export class Tables {
	public static get TableNames(){
        return [
			'tbglobalvar',
			'tbguide',
			'tbunforcedguide',
			'tbguideopenplan',
			'tblocalization',
        ];
    }
    private _TbGlobalVar: TbGlobalVar
    get TbGlobalVar(): TbGlobalVar  { return this._TbGlobalVar;}
    private _TbGuide: TbGuide
    get TbGuide(): TbGuide  { return this._TbGuide;}
    private _TbUnforcedGuide: TbUnforcedGuide
    get TbUnforcedGuide(): TbUnforcedGuide  { return this._TbUnforcedGuide;}
    private _TbGuideOpenPlan: TbGuideOpenPlan
    get TbGuideOpenPlan(): TbGuideOpenPlan  { return this._TbGuideOpenPlan;}
    private _TbLocalization: TbLocalization
    get TbLocalization(): TbLocalization  { return this._TbLocalization;}

    constructor(loader: JsonLoader) {
        let tables = new Map<string, any>()
        this._TbGlobalVar = new TbGlobalVar(loader('tbglobalvar'))
        tables.set('TbGlobalVar', this._TbGlobalVar)
        this._TbGuide = new TbGuide(loader('tbguide'))
        tables.set('TbGuide', this._TbGuide)
        this._TbUnforcedGuide = new TbUnforcedGuide(loader('tbunforcedguide'))
        tables.set('TbUnforcedGuide', this._TbUnforcedGuide)
        this._TbGuideOpenPlan = new TbGuideOpenPlan(loader('tbguideopenplan'))
        tables.set('TbGuideOpenPlan', this._TbGuideOpenPlan)
        this._TbLocalization = new TbLocalization(loader('tblocalization'))
        tables.set('TbLocalization', this._TbLocalization)

        this._TbGlobalVar.resolve(tables)
        this._TbGuide.resolve(tables)
        this._TbUnforcedGuide.resolve(tables)
        this._TbGuideOpenPlan.resolve(tables)
        this._TbLocalization.resolve(tables)
    }
}
