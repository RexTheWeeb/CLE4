import { Engine, Color, Font, Label, ScreenElement, Vector, Rectangle } from "excalibur";
import { OxygenBar } from "./oxygenBar.js";

export class UI extends ScreenElement {
    labelP1
    labelP2
    labelTimer
    oxygenBar
    timerValue = 60; // change after testing
    //Timer in seconds
    maxTime = 60; // change after testing 
    //Maximum seconds

    player1
    player2

    constructor(diver, diver2) {
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

        this.oxygenBar = new OxygenBar(700, 100, 300, 30, this.maxTime);
        this.addChild(this.oxygenBar);

        if (this.oxygenBar) {
            console.log("OxygenBar is initialized successfully.");
        }


        this._lastTimerUpdate = engine.clock.now()
    }

    updateScore() {
        this.labelP1.text = `Score P1: ${this.player1.score}`;
        this.labelP2.text = `Score P2: ${this.player2.score}`;
    }

    onPostUpdate(engine) {
    if (engine.clock.now() - this._lastTimerUpdate > 1000 && this.timerValue > 0) {
        this.timerValue -= 1;
        if (this.labelTimer) {
            this.labelTimer.text = `Oxygen: ${this.timerValue}`;
        }
        this.oxygenBar.setValue(this.timerValue);
        this._lastTimerUpdate = engine.clock.now();
        if (this.timerValue === 0) {
            if (engine.goToGameOver) {
                engine.goToGameOver();
            }
        }
    }
}
}
