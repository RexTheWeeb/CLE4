import { Vector, CollisionType } from "excalibur"
import { Resources } from "./resources.js"
import { Pickup } from "./pickup.js"
import { Player } from "./player.js"


export class Trash extends Pickup {

    worth

    constructor(player) {
        super()
        this.graphics.use(Resources.Packet.toSprite())
        this.pos = new Vector(0, 0)
        this.scale = new Vector(1, 1)
    }

    onInitialize(){
        this.worth = 1;
    }
}