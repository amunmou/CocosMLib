
import { _decorator, Component, Node, EventTouch, AudioClip } from 'cc';
import { app } from '../../mm/App';
import { UIBase } from '../../mm/ui/UIBase';
const { ccclass, property } = _decorator;

@ccclass('UIAudioMgr')
export class UIAudioMgr extends UIBase {



    playMusic(evt: EventTouch, data: string) {
        if (data == "1") {
            app.audio.playMusic(app.audioKey.M_BGM1,0.5);
        } else {
            app.audio.playMusic(app.audioKey.M_BGM2);
        }
    }

    playEffect(evt: EventTouch, data: string) {
        if (data == "1") {
            app.audio.playEffect(app.audioKey.E_Click, 1, {
                loop: false,
                onStart: (clip: AudioClip) => {
                    console.log("onStart playEffect1", clip);
                },
                onFinished: () => {
                    console.log("onFinished playEffect1");
                }
            });
        } else {
            app.audio.playEffect(app.audioKey.E_Bomb,1);
        }
    }

    playEffect1Loop(evt: EventTouch, data: string) {
        app.audio.playEffect(app.audioKey.E_Click, 1, {
            loop: true,
            onStart: (clip: AudioClip) => {
                console.log("onStart playEffect1Loop", clip);
                this.effect1Clip = clip;
            },
            onFinished: () => {
                console.log("onFinished playEffect1Loop");
            }
        });
    }

    playOrPauseMusic() {
        if (app.audio.isPlayingMusic) {
            app.audio.pauseMusic(true);
        } else {
            app.audio.pauseMusic(false);
        }
    }

    effect1Clip: AudioClip | null = null;
    stopEffect1() {
        if (this.effect1Clip) {
            app.audio.stopEffect(this.effect1Clip);
        }
    }

    stopEffect() {
        app.audio.stopEffect();
    }


}