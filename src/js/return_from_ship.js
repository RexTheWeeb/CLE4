import { Actor, Vector, Color } from "excalibur"
import { Player } from "./player.js"

export class ReturnTeleport extends Actor {
    constructor(pos) {
        super({
            pos: pos,
            width: 50,
            height: 50,
            color: Color.Green
        })
    }

    onInitialize(engine) {
        this.on("collisionstart", (event) => this.hitSomething(event))
    }

    hitSomething(event) {
        if (event.other.owner instanceof Player) {
            this.scene.engine.goToScene('root') 
        }
    }
}