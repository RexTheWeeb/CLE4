import { Actor, Vector, Color } from "excalibur"
import { Resources } from './resources'
import { Player } from './player.js'
import { Player2 } from './player2.js'

export class Shipteleport extends Actor {
    constructor(pos) {
        super({
            pos: pos,
            width: 50,
            height: 50,
            color: Color.Red
        })
        this.player1In = false
        this.player2In = false
    }

    onInitialize(engine) {
        this.on("collisionstart", (event) => this.enterTeleport(event))
        this.on("collisionend", (event) => this.leaveTeleport(event))
    }

    enterTeleport(event) {
        if (event.other.owner instanceof Player) {
            this.player1In = true
        }
        if (event.other.owner instanceof Player2) {
            this.player2In = true
        }
        if (this.player1In || this.player2In) {
            this.scene.engine.goToScene('supplyship')
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