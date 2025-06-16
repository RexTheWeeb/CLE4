import { Actor, Vector, Color } from "excalibur"
import { Resources } from './resources'
import { Player } from './player.js'

export class Shipteleport extends Actor {
    constructor(pos) {
        super({
            pos: pos,
            width: 50,
            height: 50,
            color: Color.Red
        })
    }

    onInitialize(engine) {
        this.on("collisionstart", (event) => this.goToShip(event))
    }

    goToShip(event) {
        if (event.other.owner instanceof Player) {
            this.scene.engine.goToScene('supplyship')
        }
    }
}