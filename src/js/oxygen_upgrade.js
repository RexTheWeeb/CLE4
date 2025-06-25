import { Actor, Vector } from "excalibur"
import { Resources } from './resources.js'
import { Player } from './player.js'
import { PlayerGrounded } from './player_grounded.js'

export class OxygenUpgrade extends Actor {
    playersInRange = []

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
        this.on("collisionstart", (evt) => this.onPlayerEnter(evt))
        this.on("collisionend", (evt) => this.onPlayerExit(evt))
    }

    onPlayerEnter(evt) {
        const actor = evt.other.owner
        if ((actor instanceof Player || actor instanceof PlayerGrounded) && !this.playersInRange.includes(actor)) {
            this.playersInRange.push(actor)
        }
    }

    onPlayerExit(evt) {
        const actor = evt.other.owner
        this.playersInRange = this.playersInRange.filter(p => p !== actor)
    }

    onClick(evt, engine) {
        // Check all players in range
        for (const actor of this.playersInRange) {
            if (actor.score === 2) { 
                if (engine.ui && typeof engine.ui.timerValue === "number") {
                    engine.ui.timerValue = Math.min(engine.ui.timerValue, 60)
                    engine.ui.oxygenBar.setValue(engine.ui.timerValue)
                    engine.ui.maxTime = 90
                    engine.ui.oxygenBar.maxValue = 90
                    engine.ui.timerValue = 90
                    engine.ui.oxygenBar.setValue(engine.ui.timerValue)
                    engine.ui.labelTimer.text = `Oxygen: ${engine.ui.timerValue}`
                }
                if (typeof actor.increaseOxygenBar === "function") {
                    actor.increaseOxygenBar(50)
                } else {
                    actor.oxygenBarLength = (actor.oxygenBarLength || 100) + 50
                }
                this.kill()
                break
            }
        }
    }
}