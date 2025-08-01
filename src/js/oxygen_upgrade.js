import { Actor, Keys, Vector } from "excalibur"
import { Resources } from './resources.js'
import { Player } from './player.js'
import { PlayerGrounded } from './player_grounded.js'

// OxygenUpgrade can be picked up by both Player and PlayerGrounded if score === 15
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
        this.on("collisionstart", (evt) => this.onPlayerEnter(evt))
        this.on("collisionend", (evt) => this.onPlayerExit(evt))
    }

        onPreUpdate(engine) {
        for (const actor of this.playersInRange) {
            // Keyboard: E key
            const ePressed = engine.input.keyboard.wasPressed(Keys.E)
            // Gamepad: button 0 (A)
            const pad = engine.input.gamepads.at(actor.gamepadIndex || 0)
            const gamepadPressed = pad && pad.wasButtonPressed(0)
            if (ePressed || gamepadPressed) {
                this.onClick(actor, engine)
                break
            }
        }
    }

    onPlayerEnter(evt) {
        const actor = evt.other.owner
        // Add both Player and PlayerGrounded to the range array if not already present
        if ((actor instanceof Player || actor instanceof PlayerGrounded) && !this.playersInRange.includes(actor)) {
            this.playersInRange.push(actor)
        }
    }

    onPlayerExit(evt) {
        const actor = evt.other.owner
        this.playersInRange = this.playersInRange.filter(p => p !== actor)
    }

    onClick(evt, engine) {
        // Allow any player in range with score === 15 to pick up the upgrade
        for (const actor of this.playersInRange) {
            if (actor.score >= 10) {
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