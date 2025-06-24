import { Actor, Vector } from "excalibur"
import { Resources } from './resources.js'
import { Player } from './player.js'
import { PlayerGrounded } from './player_grounded.js'

export class SpeedUpgrade extends Actor {
    constructor(pos) {
        super({
            pos: pos,
            width: 64,
            height: 64
        })
    }

    onInitialize(engine) {
        const sprite = Resources.SpeedUpgrade.toSprite()
        sprite.width = 64
        sprite.height = 64
        this.graphics.use(sprite)
        this.on("pointerdown", (evt) => this.onClick(evt, engine))
    }

    onClick(evt, engine) {
        engine.currentScene.actors.forEach(actor => {
            if (actor instanceof Player || actor instanceof PlayerGrounded) {
                if (actor.score === 2 || actor.score === 3 || actor.score === 4) {
                    if (typeof actor.increaseSpeed === "function") {
                        actor.increaseSpeed(300)
                        // console.log("Speed after upgrade (increaseSpeed):", actor.speed)
                    } else {
                        actor.speed = (actor.speed || 200) + 300
                        // console.log("Speed after upgrade (direct):", actor.speed)
                    }
                    this.kill()
                }
            }
        })
    }
}