import { Color, Font, FontUnit, Label, ScreenElement, Vector } from "excalibur";

export class Dialog extends ScreenElement{
    constructor(text){
        super({
            width: 700,
            height: 100,
            color: Color.White,
            anchor: new Vector(0.05, 0.05),
            pos: new Vector(300, 650 - 100),
            opacity: 0
        })
        this.text = text
    }

    onInitialize(engine){
        this.dialog = new Label({
            text: this.text,
            anchor: new Vector(0, 0),
            font: new Font({ size: 32, unit: FontUnit.Px, color: Color.Black })

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