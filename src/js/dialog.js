import { Color, Label, ScreenElement, Vector } from "excalibur";

export class Dialog extends ScreenElement{
    constructor(){
        super({
            width: 1280,
            height: 100,
            color: Color.White,
            anchor: new Vector(0, 0),
            pos: new Vector(0, 768 - 100),
            opacity: 0
        })
    }

    onInitialize(engine){
        this.dialog = new Label({
            text: 'Hello',
            anchor: new Vector(0, 0),
        })
        this.addChild(this.dialog)
    }

    makeVisible(){
        this.graphics.opacity = 0.8;
    }

    makeInvisible(){
        this.graphics.opacity = 0;
    }
}