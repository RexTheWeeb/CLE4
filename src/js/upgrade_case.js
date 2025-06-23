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

    onClick(evt, engine) { // moet andere methode krijgen dan onclick
        // Only allow upgrade if player score is 5, 10, or 15
        engine.currentScene.actors.forEach(actor => {
            if (actor.constructor.name === "PlayerGrounded") {
                // Check if actor.score exists and is 5, 10, or 15
                if (actor.score === 2 || actor.score === 3 || actor.score === 4) {
                    if (typeof actor.increaseOxygenBar === "function") {
                        actor.increaseOxygenBar(50)
                    } else {
                        actor.oxygenBarLength = (actor.oxygenBarLength || 100) + 50
                    }
                    this.kill()
                }
                if (actor.score === 1 || actor.score === 2 || actor.score === 3) {
                    if (typeof actor.increaseSpeed === "function") {
                        actor.increaseSpeed(40)
                    } else {
                        actor.playerSpeed = (actor.playerSpeed || 200) + 40
                    }
                    this.kill()
                }
            }
        })
    }
}