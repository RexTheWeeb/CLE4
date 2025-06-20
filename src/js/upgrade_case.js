import { Actor, Vector } from "excalibur"
import { Resources } from './resources.js'

export class UpgradeCase extends Actor {
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
        // Give all PlayerGrounded actors a longer oxygen bar
        engine.currentScene.actors.forEach(actor => {
            if (actor.constructor.name === "PlayerGrounded") {
                if (typeof actor.increaseOxygenBar === "function") {
                    actor.increaseOxygenBar(50) // example: increase by 50 units
                } else {
                    actor.oxygenBarLength = (actor.oxygenBarLength || 100) + 50
                }
            }
        })
        // Optional: remove or disable the upgrade case after use
        this.kill()
    }
}