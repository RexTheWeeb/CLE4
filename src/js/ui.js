import { Engine, Color, Font, Label, ScreenElement, Vector } from "excalibur";

export class UI extends ScreenElement {
    labelP1
    labelP2
    labelTimer
    timerValue = 60; //Waarde voor de timer in seconden.

    player1
    player2

    constructor(diver, diver2){
        super()
        this.player1 = diver;
        this.player2 = diver2;
    }

    onInitialize(engine) {
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
        this.labelTimer = new Label({
            text: `Oxygen: ${this.timerValue}`,
            pos: new Vector(700, 50),
            font: new Font({
                family: 'Arial',
                size: 24,
                color: Color.White
            }),
        });
        this.addChild(this.labelP1);
        this.addChild(this.labelP2);
        this.addChild(this.labelTimer);

        this._lastTimerUpdate = engine.clock.now()
    }

    updateScore() {
        this.labelP1.text = `Score P1: ${this.player1.score}`;
        this.labelP2.text = `Score P2: ${this.player2.score}`;
    }

    onPostUpdate(engine){
        if (engine.clock.now() - this._lastTimerUpdate > 1000 && this.timerValue > 0) {
            this.timerValue -= 1;
            this.labelTimer.text = `Oxygen: ${this.timerValue}`;
            this._lastTimerUpdate = engine.clock.now();
        }
    }
}