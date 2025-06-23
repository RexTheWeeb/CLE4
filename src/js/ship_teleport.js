import { Actor, Vector, Color, Keys } from "excalibur"
import { Resources } from './resources'
import { Player } from './player.js'
import { PlayerGrounded } from "./player_grounded.js"

export class Shipteleport extends Actor {
    constructor(pos, color, location) {
        super({
            pos: pos,
            width: 50,
            height: 50,
            color: color
        })
        this.location = location
        this.playerOverlapping = false
    }

    onInitialize(engine) {
        this.engine = engine
        this.on("collisionstart", (event) => this.handleCollisionStart(event))
        this.on("collisionend", (event) => this.handleCollisionEnd(event))
    }

    handleCollisionStart(event) {
        if (event.other.owner instanceof Player || event.other.owner instanceof PlayerGrounded) {
            this.playerOverlapping = true
        }
    }

    handleCollisionEnd(event) {
        if (event.other.owner instanceof Player || event.other.owner instanceof PlayerGrounded) {
            this.playerOverlapping = false
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