import { Vector, CollisionType } from "excalibur"
import { Resources } from "./resources.js"
import { Pickup } from "./pickup.js"
import { Player } from "./player.js"


export class Trash extends Pickup {

    worth

    constructor(player) {
        super(Resources.Packet.toSprite(), 1)
        this.scale = new Vector(1, 1)
    }

    onInitialize(){
        this.worth = 1;
    }
}