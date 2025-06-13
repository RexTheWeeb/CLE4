import { Actor, Color, Font, Label, ScreenElement, Vector } from "excalibur";

export class UI extends ScreenElement {
    labelP1
    labelP2

    player1
    player2

    constructor(diver, diver2){
        super()
        this.player1 = diver;
        this.player2 = diver2;
    }

    onInitialize() {
        this.labelP1 = new Label({
            text: 'Score P1: 0',
            pos: new Vector(100, 50),
            font: new Font({
                family: 'Arial',
                size: 24,
                color: Color.White
            }),
        });
        this.labelP2 = new Label({
            text: 'Score P2: 0',
            pos: new Vector(100, 100),
            font: new Font({
                family: 'Arial',
                size: 24,
                color: Color.White
            }),
        });
        this.addChild(this.labelP1);
        this.addChild(this.labelP2);
    }

    updateScore() {
        this.labelP1.text = `Score P1: ${this.player1.score}`;
        this.labelP2.text = `Score P2: ${this.player2.score}`;
    }
}