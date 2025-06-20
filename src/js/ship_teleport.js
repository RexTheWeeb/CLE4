import { Actor, Vector, Color } from "excalibur"
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
    }

    onInitialize(engine) {
        this.on("collisionstart", (event) => this.goToTeleport(event))
    }

    goToTeleport(event) {
        if (event.other.owner instanceof Player || PlayerGrounded) {
            console.log('hello')
            console.log(this.location)
            // @ts-ignore
            this.scene.engine.goToScene(this.location)
        }
    }
}