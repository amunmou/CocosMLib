const {ccclass,property} = cc._decorator;
import  UIBase from "../../libs/ui/UIBase";
import { UIManager,EUIName } from "../../libs/ui/UIManager";


@ccclass
export default class UIUI1 extends UIBase {

    onLoad(){
        // super.onLoad();
    }


    start () {
        // let {ak,bk} = this.args;
        // super..start();
        
    }

    onclick(){
        console.log("onclick");
        
        UIManager.inst.openUI(EUIName.UI2);
    }

}
