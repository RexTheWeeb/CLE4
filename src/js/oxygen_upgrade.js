import { Actor, Vector } from "excalibur"
import { Resources } from './resources.js'
import { Player } from './player.js'
import { PlayerGrounded } from './player_grounded.js'

export class OxygenUpgrade extends Actor {
    constructor(pos) {
        super({
            pos: pos,
            width: 64,
            height: 64
        })
    }

    onInitialize(engine) {
        const sprite = Resources.up1.toSprite()
        sprite.width = 64
        sprite.height = 64
        this.graphics.use(sprite)
        this.on("pointerdown", (evt) => this.onClick(evt, engine))
    }

    onClick(evt, engine) {
        engine.currentScene.actors.forEach(actor => {
            if ((actor instanceof Player || actor instanceof PlayerGrounded) &&
                (actor.score === 2 || actor.score === 3 || actor.score === 4)) {

                if (engine.ui && typeof engine.ui.timerValue === "number") {
                    // Clamp to 60 before upgrade
                    engine.ui.timerValue = Math.min(engine.ui.timerValue, 60)
                    engine.ui.oxygenBar.setValue(engine.ui.timerValue)
                    // Upgrade: set max to 70 and refill to 70
                    engine.ui.maxTime = 70
                    engine.ui.oxygenBar.maxValue = 70
                    engine.ui.timerValue = 70
                    engine.ui.oxygenBar.setValue(engine.ui.timerValue)
                    engine.ui.labelTimer.text = `Oxygen: ${engine.ui.timerValue}`
                }

                // Museum: update player attribute if needed
                if (typeof actor.increaseOxygenBar === "function") {
                    actor.increaseOxygenBar(50)
                } else {
                    actor.oxygenBarLength = (actor.oxygenBarLength || 100) + 50
                }
                this.kill()
            }
        })
    }
}