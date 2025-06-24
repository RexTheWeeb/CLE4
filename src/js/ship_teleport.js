import { Actor, Vector, Color, Keys } from "excalibur"
import { Resources } from './resources'
import { Player } from './player.js'
import { PlayerGrounded } from "./player_grounded.js"

export class Shipteleport extends Actor {
    sprite
    constructor(pos, sprite, scale, location) {
        super({
            pos: pos,
            width: sprite.width,
            height: sprite.height,        })
        this.location = location
        this.playerOverlapping = false
        this.sprite = sprite
        this.scale = scale
    }

    onInitialize(engine) {
        this.graphics.use(this.sprite).scale = this.scale
        this.engine = engine
        this.on("collisionstart", (event) => this.handleCollisionStart(event))
        this.on("collisionend", (event) => this.handleCollisionEnd(event))
    }

    handleCollisionStart(event) {
        if (event.other.owner instanceof Player || event.other.owner instanceof PlayerGrounded) {
            this.playerOverlapping = true
            this.engine.dialog.makeVisible()
        }
    }

    handleCollisionEnd(event) {
        if (event.other.owner instanceof Player || event.other.owner instanceof PlayerGrounded) {
            this.playerOverlapping = false
            this.engine.dialog.makeInvisible()

        }
    }

    onPreUpdate() {
        if (this.playerOverlapping && this.engine.input.keyboard.wasPressed(Keys.E)) {
            // @ts-ignore
            this.scene.engine.goToScene(this.location)
        }
    }

    leaveTeleport(event) {
        if (event.other.owner instanceof Player) {
            this.player1In = false
        }
        if (event.other.owner instanceof Player2) {
            this.player2In = false
        }
    }
}