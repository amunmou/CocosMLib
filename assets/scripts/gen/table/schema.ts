
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------


export namespace test { 
export enum AccessFlag {
    WRITE = 1,
    READ = 2,
    TRUNCATE = 4,
    NEW = 8,
    READ_WRITE = WRITE|READ,
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





export class TGlobalVar {

    constructor(_json_: any) {
        if (_json_.LeafletClickCnt === undefined) { throw new Error() }
        this.LeafletClickCnt = _json_.LeafletClickCnt
        if (_json_.LeafletCnt === undefined) { throw new Error() }
        this.LeafletCnt = _json_.LeafletCnt
        if (_json_.LeafletRecover === undefined) { throw new Error() }
        this.LeafletRecover = _json_.LeafletRecover
        if (_json_.BandBuff === undefined) { throw new Error() }
        { this.BandBuff = []; for(let _ele0 of _json_.BandBuff) { let _e0; _e0 = _ele0; this.BandBuff.push(_e0);}}
        if (_json_.OfflineData === undefined) { throw new Error() }
        { this.OfflineData = []; for(let _ele0 of _json_.OfflineData) { let _e0; _e0 = _ele0; this.OfflineData.push(_e0);}}
        if (_json_.TarotCoolTime === undefined) { throw new Error() }
        this.TarotCoolTime = _json_.TarotCoolTime
        if (_json_.HeroMoveSpeed === undefined) { throw new Error() }
        this.HeroMoveSpeed = _json_.HeroMoveSpeed
        if (_json_.Gratuity === undefined) { throw new Error() }
        { this.Gratuity = []; for(let _ele0 of _json_.Gratuity) { let _e0; _e0 = _ele0; this.Gratuity.push(_e0);}}
        if (_json_.SpecialCustomersCoolTime === undefined) { throw new Error() }
        { this.SpecialCustomersCoolTime = []; for(let _ele0 of _json_.SpecialCustomersCoolTime) { let _e0; _e0 = _ele0; this.SpecialCustomersCoolTime.push(_e0);}}
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

    resolve(tables:Tables) {
        
        
        
        
        
        
        
        
        
        
    }
}





export class TGuide {

    constructor(_json_: any) {
        if (_json_.ID === undefined) { throw new Error() }
        this.ID = _json_.ID
        if (_json_.GuideID === undefined) { throw new Error() }
        this.GuideID = _json_.GuideID
        if (_json_.StepId === undefined) { throw new Error() }
        this.StepId = _json_.StepId
        if (_json_.UIName === undefined) { throw new Error() }
        this.UIName = _json_.UIName
        if (_json_.Delay === undefined) { throw new Error() }
        this.Delay = _json_.Delay
        if (_json_.FinishStepType === undefined) { throw new Error() }
        this.FinishStepType = _json_.FinishStepType
        if(_json_.HollowPos != undefined) { this.HollowPos = new vector2(_json_.HollowPos) } else { this.HollowPos = undefined }
        if(_json_.HollowSize != undefined) { this.HollowSize = new vector2(_json_.HollowSize) } else { this.HollowSize = undefined }
        if (_json_.FingerDir === undefined) { throw new Error() }
        this.FingerDir = _json_.FingerDir
        if(_json_.TipPos != undefined) { this.TipPos = new vector2(_json_.TipPos) } else { this.TipPos = undefined }
        if (_json_.TipText === undefined) { throw new Error() }
        this.TipText = _json_.TipText
        if (_json_.FinishStepDelay === undefined) { throw new Error() }
        this.FinishStepDelay = _json_.FinishStepDelay
        if (_json_.HollowAlign === undefined) { throw new Error() }
        { this.HollowAlign = []; for(let _ele0 of _json_.HollowAlign) { let _e0; _e0 = _ele0; this.HollowAlign.push(_e0);}}
        if (_json_.HollowKeep === undefined) { throw new Error() }
        this.HollowKeep = _json_.HollowKeep
        if (_json_.HollowAnimDur === undefined) { throw new Error() }
        this.HollowAnimDur = _json_.HollowAnimDur
        if (_json_.HollowType === undefined) { throw new Error() }
        this.HollowType = _json_.HollowType
        if (_json_.HollowScale === undefined) { throw new Error() }
        this.HollowScale = _json_.HollowScale
        if (_json_.Opacity === undefined) { throw new Error() }
        this.Opacity = _json_.Opacity
        if (_json_.RingScale === undefined) { throw new Error() }
        this.RingScale = _json_.RingScale
        if(_json_.RingOffset != undefined) { this.RingOffset = new vector2(_json_.RingOffset) } else { this.RingOffset = undefined }
        if(_json_.FingerOffset != undefined) { this.FingerOffset = new vector2(_json_.FingerOffset) } else { this.FingerOffset = undefined }
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
     * 步骤id
     */
    readonly StepId: number
    /**
     * 引导所在UI名字
     */
    readonly UIName: string
    /**
     * 延迟开始本步引导
     */
    readonly Delay: number
    /**
     * 行进逻辑
     */
    readonly FinishStepType: number
    /**
     * 挖孔位置
     */
    readonly HollowPos: vector2|undefined
    /**
     * 挖孔尺寸
     */
    readonly HollowSize: vector2|undefined
    /**
     * 手指方向
     */
    readonly FingerDir: number
    /**
     * 提示文字位置
     */
    readonly TipPos: vector2|undefined
    /**
     * 提示文字
     */
    readonly TipText: string
    /**
     * 等多久完成
     */
    readonly FinishStepDelay: number
    /**
     * 挖孔对齐方式
     */
    readonly HollowAlign: number[]
    /**
     * 保留上一步挖孔
     */
    readonly HollowKeep: boolean
    /**
     * 挖孔动画时长
     */
    readonly HollowAnimDur: number
    /**
     * 挖孔类型
     */
    readonly HollowType: number
    /**
     * 挖孔缩放
     */
    readonly HollowScale: number
    /**
     * 遮罩透明度
     */
    readonly Opacity: number
    /**
     * 圆圈缩放
     */
    readonly RingScale: number
    /**
     * 圆圈相对挖孔偏移
     */
    readonly RingOffset: vector2|undefined
    /**
     * 手指相对挖孔偏移
     */
    readonly FingerOffset: vector2|undefined
    /**
     * 加载预制体
     */
    readonly Prefab: string

    resolve(tables:Tables) {
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    }
}





export class TGuideOpen {

    constructor(_json_: any) {
        if (_json_.ID === undefined) { throw new Error() }
        this.ID = _json_.ID
        if (_json_.GuideCondition === undefined) { throw new Error() }
        this.GuideCondition = _json_.GuideCondition
        if (_json_.FuncOpenID === undefined) { throw new Error() }
        this.FuncOpenID = _json_.FuncOpenID
        if (_json_.ItemRequire === undefined) { throw new Error() }
        this.ItemRequire = _json_.ItemRequire
        if (_json_.GiveItem === undefined) { throw new Error() }
        this.GiveItem = _json_.GiveItem
        if (_json_.EmitOnce === undefined) { throw new Error() }
        this.EmitOnce = _json_.EmitOnce
        if (_json_.Args1 === undefined) { throw new Error() }
        this.Args1 = _json_.Args1
        if (_json_.Args2 === undefined) { throw new Error() }
        this.Args2 = _json_.Args2
        if (_json_.Args3 === undefined) { throw new Error() }
        this.Args3 = _json_.Args3
    }

    /**
     * 引导ID
     */
    readonly ID: number
    /**
     * 引导触发条件类型
     */
    readonly GuideCondition: number
    /**
     * 功能开启ID
     */
    readonly FuncOpenID: number
    /**
     * 背包物品要求
     */
    readonly ItemRequire: string
    /**
     * 是否补充物品
     */
    readonly GiveItem: boolean
    /**
     * 触发一次
     */
    readonly EmitOnce: boolean
    /**
     * 参数1
     */
    readonly Args1: string
    /**
     * 参数2
     */
    readonly Args2: string
    /**
     * 参数3
     */
    readonly Args3: string

    resolve(tables:Tables) {
        
        
        
        
        
        
        
        
        
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

    resolve(tables:Tables) {
        
        
        
        
    }
}





export class TUnforcedGuide {

    constructor(_json_: any) {
        if (_json_.ID === undefined) { throw new Error() }
        this.ID = _json_.ID
        if (_json_.GuideID === undefined) { throw new Error() }
        this.GuideID = _json_.GuideID
        if (_json_.StepId === undefined) { throw new Error() }
        this.StepId = _json_.StepId
        if (_json_.UIName === undefined) { throw new Error() }
        this.UIName = _json_.UIName
        if (_json_.NodePath === undefined) { throw new Error() }
        this.NodePath = _json_.NodePath
        if(_json_.FingerOffset != undefined) { this.FingerOffset = new vector2(_json_.FingerOffset) } else { this.FingerOffset = undefined }
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
     * 步骤id
     */
    readonly StepId: number
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
    readonly FingerOffset: vector2|undefined

    resolve(tables:Tables) {
        
        
        
        
        
        
    }
}





/**
 * 二维向量
 */
export class vector2 {

    constructor(_json_: any) {
        if (_json_.x === undefined) { throw new Error() }
        this.x = _json_.x
        if (_json_.y === undefined) { throw new Error() }
        this.y = _json_.y
    }

    /**
     * 二维向量x
     */
    readonly x: number
    /**
     * 二维向量y
     */
    readonly y: number

    resolve(tables:Tables) {
        
        
    }
}





/**
 * 三维向量
 */
export class vector3 {

    constructor(_json_: any) {
        if (_json_.x === undefined) { throw new Error() }
        this.x = _json_.x
        if (_json_.y === undefined) { throw new Error() }
        this.y = _json_.y
        if (_json_.z === undefined) { throw new Error() }
        this.z = _json_.z
    }

    /**
     * 三维向量x
     */
    readonly x: number
    /**
     * 三维向量y
     */
    readonly y: number
    /**
     * 三维向量z
     */
    readonly z: number

    resolve(tables:Tables) {
        
        
        
    }
}






export class TbGlobalVar {

    private _data: TGlobalVar
    constructor(_json_: any) {
        if (_json_.length != 1) throw new Error('table mode=one, but size != 1')
        this._data = new TGlobalVar(_json_[0])
    }

    getData(): TGlobalVar { return this._data; }

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

    resolve(tables:Tables)
    {
        this._data.resolve(tables)
    }
    
}




export class TbGuide {
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

    resolve(tables:Tables) {
        for(let  data of this._dataList)
        {
            data.resolve(tables)
        }
    }

}




export class TbUnforcedGuide {
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

    resolve(tables:Tables) {
        for(let  data of this._dataList)
        {
            data.resolve(tables)
        }
    }

}




export class TbGuideOpen {
    private _dataMap: Map<number, TGuideOpen>
    private _dataList: TGuideOpen[]
    constructor(_json_: any) {
        this._dataMap = new Map<number, TGuideOpen>()
        this._dataList = []
        for(var _json2_ of _json_) {
            let _v: TGuideOpen
            _v = new TGuideOpen(_json2_)
            this._dataList.push(_v)
            this._dataMap.set(_v.ID, _v)
        }
    }

    getDataMap(): Map<number, TGuideOpen> { return this._dataMap; }
    getDataList(): TGuideOpen[] { return this._dataList; }

    get(key: number): TGuideOpen | undefined { return this._dataMap.get(key); }

    resolve(tables:Tables) {
        for(let  data of this._dataList)
        {
            data.resolve(tables)
        }
    }

}




export class TbLocalization {
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

    resolve(tables:Tables) {
        for(let  data of this._dataList)
        {
            data.resolve(tables)
        }
    }

}




type JsonLoader = (file: string) => any

export class Tables {
    private _TbGlobalVar: TbGlobalVar
    get TbGlobalVar(): TbGlobalVar  { return this._TbGlobalVar;}
    private _TbGuide: TbGuide
    get TbGuide(): TbGuide  { return this._TbGuide;}
    private _TbUnforcedGuide: TbUnforcedGuide
    get TbUnforcedGuide(): TbUnforcedGuide  { return this._TbUnforcedGuide;}
    private _TbGuideOpen: TbGuideOpen
    get TbGuideOpen(): TbGuideOpen  { return this._TbGuideOpen;}
    private _TbLocalization: TbLocalization
    get TbLocalization(): TbLocalization  { return this._TbLocalization;}

    constructor(loader: JsonLoader) {
        this._TbGlobalVar = new TbGlobalVar(loader('tbglobalvar'))
        this._TbGuide = new TbGuide(loader('tbguide'))
        this._TbUnforcedGuide = new TbUnforcedGuide(loader('tbunforcedguide'))
        this._TbGuideOpen = new TbGuideOpen(loader('tbguideopen'))
        this._TbLocalization = new TbLocalization(loader('tblocalization'))

        this._TbGlobalVar.resolve(this)
        this._TbGuide.resolve(this)
        this._TbUnforcedGuide.resolve(this)
        this._TbGuideOpen.resolve(this)
        this._TbLocalization.resolve(this)
    }
}

