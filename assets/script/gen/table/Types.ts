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


export class TbDemoGroupDefineFromExcel{
    private _dataMap: Map<number, DemoGroup>
    private _dataList: DemoGroup[]
    constructor(_json_: any) {
        this._dataMap = new Map<number, DemoGroup>()
        this._dataList = []
        for(var _json2_ of _json_) {
            let _v: DemoGroup
            _v = new DemoGroup(_json2_)
            this._dataList.push(_v)
            this._dataMap.set(_v.id, _v)
        }
    }

    getDataMap(): Map<number, DemoGroup> { return this._dataMap; }
    getDataList(): DemoGroup[] { return this._dataList; }

    get(key: number): DemoGroup | undefined { return this._dataMap.get(key); }

    resolve(_tables: Map<string, any>) {
        for(var v of this._dataList) {
            v.resolve(_tables)
        }
    }

}





export class DemoGroup {

    constructor(_json_: any) {
        if (_json_.id === undefined) { throw new Error() }
        this.id = _json_.id
        if (_json_.name === undefined) { throw new Error() }
        this.name = _json_.name
        if (_json_.desc === undefined) { throw new Error() }
        this.desc = _json_.desc
        if (_json_.num === undefined) { throw new Error() }
        this.num = _json_.num
        if (_json_.price === undefined) { throw new Error() }
        this.price = _json_.price
    }

    /**
     * id
     */
    readonly id: number
    /**
     * 名称
     */
    readonly name: string
    /**
     * 描述
     */
    readonly desc: string
    /**
     * 个数
     */
    readonly num: number
    /**
     * 价格
     */
    readonly price: number

    resolve(_tables: Map<string, any>) {
    }
}




export class TbDemoGroupDefineFromExcel1{
    private _dataMap: Map<number, DemoGroup1>
    private _dataList: DemoGroup1[]
    constructor(_json_: any) {
        this._dataMap = new Map<number, DemoGroup1>()
        this._dataList = []
        for(var _json2_ of _json_) {
            let _v: DemoGroup1
            _v = new DemoGroup1(_json2_)
            this._dataList.push(_v)
            this._dataMap.set(_v.id, _v)
        }
    }

    getDataMap(): Map<number, DemoGroup1> { return this._dataMap; }
    getDataList(): DemoGroup1[] { return this._dataList; }

    get(key: number): DemoGroup1 | undefined { return this._dataMap.get(key); }

    resolve(_tables: Map<string, any>) {
        for(var v of this._dataList) {
            v.resolve(_tables)
        }
    }

}





export class DemoGroup1 {

    constructor(_json_: any) {
        if (_json_.id === undefined) { throw new Error() }
        this.id = _json_.id
        if (_json_.name === undefined) { throw new Error() }
        this.name = _json_.name
        if (_json_.desc === undefined) { throw new Error() }
        this.desc = _json_.desc
        if (_json_.num === undefined) { throw new Error() }
        this.num = _json_.num
        if (_json_.price === undefined) { throw new Error() }
        this.price = _json_.price
        if (_json_.price1 === undefined) { throw new Error() }
        this.price1 = _json_.price1
    }

    /**
     * id
     */
    readonly id: number
    /**
     * 名称
     */
    readonly name: string
    /**
     * 描述
     */
    readonly desc: string
    /**
     * 个数
     */
    readonly num: number
    /**
     * 价格
     */
    readonly price: number
    /**
     * 价格
     */
    readonly price1: number

    resolve(_tables: Map<string, any>) {
    }
}




export class TbCityMap{
    private _dataMap: Map<number, CityMap>
    private _dataList: CityMap[]
    constructor(_json_: any) {
        this._dataMap = new Map<number, CityMap>()
        this._dataList = []
        for(var _json2_ of _json_) {
            let _v: CityMap
            _v = new CityMap(_json2_)
            this._dataList.push(_v)
            this._dataMap.set(_v.id, _v)
        }
    }

    getDataMap(): Map<number, CityMap> { return this._dataMap; }
    getDataList(): CityMap[] { return this._dataList; }

    get(key: number): CityMap | undefined { return this._dataMap.get(key); }

    resolve(_tables: Map<string, any>) {
        for(var v of this._dataList) {
            v.resolve(_tables)
        }
    }

}





export class CityMap {

    constructor(_json_: any) {
        if (_json_.id === undefined) { throw new Error() }
        this.id = _json_.id
        if (_json_.Plan_ID === undefined) { throw new Error() }
        this.PlanID = _json_.Plan_ID
        if (_json_.LV === undefined) { throw new Error() }
        this.LV = _json_.LV
        if (_json_.EFF === undefined) { throw new Error() }
        this.EFF = _json_.EFF
        if (_json_.EFF_Num === undefined) { throw new Error() }
        this.EFFNum = _json_.EFF_Num
        if (_json_.EFF_Des === undefined) { throw new Error() }
        this.EFFDes = _json_.EFF_Des
        if (_json_.EFF_Des2 === undefined) { throw new Error() }
        this.EFFDes2 = _json_.EFF_Des2
        if (_json_.NeedGirlNum === undefined) { throw new Error() }
        this.NeedGirlNum = _json_.NeedGirlNum
        if (_json_.Unlock_Des === undefined) { throw new Error() }
        this.UnlockDes = _json_.Unlock_Des
    }

    /**
     * 主键
     */
    readonly id: number
    /**
     * 组ID
     */
    readonly PlanID: number
    /**
     * 技能等级
     */
    readonly LV: number
    /**
     * 效果
     */
    readonly EFF: number
    /**
     * 数值
     */
    readonly EFFNum: Float32Array
    /**
     * 效果描述1
     */
    readonly EFFDes: string
    /**
     * 效果描述2
     */
    readonly EFFDes2: string
    /**
     * 解锁时装数
     */
    readonly NeedGirlNum: number
    /**
     * 解锁描述
     */
    readonly UnlockDes: string

    resolve(_tables: Map<string, any>) {
    }
}




type JsonLoader = (file: string) => any

export class Tables {
    private _TbDemoGroupDefineFromExcel: TbDemoGroupDefineFromExcel
    get TbDemoGroupDefineFromExcel(): TbDemoGroupDefineFromExcel  { return this._TbDemoGroupDefineFromExcel;}
    private _TbDemoGroupDefineFromExcel1: TbDemoGroupDefineFromExcel1
    get TbDemoGroupDefineFromExcel1(): TbDemoGroupDefineFromExcel1  { return this._TbDemoGroupDefineFromExcel1;}
    private _TbCityMap: TbCityMap
    get TbCityMap(): TbCityMap  { return this._TbCityMap;}

    constructor(loader: JsonLoader) {
        let tables = new Map<string, any>()
        this._TbDemoGroupDefineFromExcel = new TbDemoGroupDefineFromExcel(loader('tbdemogroupdefinefromexcel'))
        tables.set('TbDemoGroupDefineFromExcel', this._TbDemoGroupDefineFromExcel)
        this._TbDemoGroupDefineFromExcel1 = new TbDemoGroupDefineFromExcel1(loader('tbdemogroupdefinefromexcel1'))
        tables.set('TbDemoGroupDefineFromExcel1', this._TbDemoGroupDefineFromExcel1)
        this._TbCityMap = new TbCityMap(loader('tbcitymap'))
        tables.set('TbCityMap', this._TbCityMap)

        this._TbDemoGroupDefineFromExcel.resolve(tables)
        this._TbDemoGroupDefineFromExcel1.resolve(tables)
        this._TbCityMap.resolve(tables)
    }
}
