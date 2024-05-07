
import { _decorator } from 'cc';
import { App } from '../../mlib/App';
import { HttpRequest } from '../../mlib/module/network/HttpRequest';
import { UIBase } from '../../mlib/module/ui/manager/UIBase';
import { UIConstant } from '../gen/UIConstant';
import { MByteBuffer } from '../../mlib/module/network/buffer/MByteBuffer';
import { BufferTool } from '../../mlib/module/network/buffer/BufferTool';

const { ccclass, property } = _decorator;

@ccclass('UIHUD')
export class UIHUD extends UIBase {


    protected start(): void {
        let jsonObj: pbroot.IPlayerInfo = { userId: 1, gender: 1, userName: "uu", nickName: "hjh" };
        let buffer: Uint8Array = pbroot.PlayerInfo.encode(jsonObj).finish();

        console.log(pbroot.PlayerInfo.getTypeUrl());


        let buff = buffer.slice().buffer;
        console.log(buff);
        let decodeObj = pbroot.PlayerInfo.decode(buffer);
        console.log(decodeObj);


        HttpRequest.requestBuffer("http://127.0.1:7098/test/pb", { method: "POST", data: buff }).then(bb => {

            // console.log(bb);
            // let decodeObj1 = pbroot.PlayerInfo.decode(bb);
            // console.log(decodeObj1);

            // let mbb = new MByteBuffer(bb);

            // console.log(mbb.readUInt32());
            // console.log(mbb.readUInt32());
            // console.log(mbb.u8Array.length);
            let num = 0b110000000;
            let buf = BufferTool.encodeNumber(num)
            console.log(num);
            console.log(buf);
            let mbb2 = new MByteBuffer(buf)
            console.log(mbb2.u8Array);
            console.log(mbb2.readUInt32());


        });


    }

    protected onClickButton(btnName: string): void {
        switch (btnName) {
            case "AudioMgr":
                App.ui.show(UIConstant.UIAudioMgr);
                break;
            case "UIMgr":
                App.ui.show(UIConstant.UIUIMgr);
                break;
            case "Guide":
                App.ui.show(UIConstant.UIGuideTest1);
                break;
            case "UIExtend":
                App.ui.show(UIConstant.UIExtend);
                break;
            case "ScrollviewEnhance":
                App.ui.show(UIConstant.UIScrollviewEnhance);
                break;
            case "HH":
                App.tipMsg.showToast("HH");
                break;
        }
    }

}


