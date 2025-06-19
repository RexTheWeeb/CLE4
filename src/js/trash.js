import { Vector, CollisionType } from "excalibur"
import { Resources } from "./resources.js"
import { Pickup } from "./pickup.js"


export class Trash extends Pickup {

    worth

    constructor() {
        super()
        this.graphics.use(Resources.Packet.toSprite())
        this.pos = new Vector(400, 300)
        this.scale = new Vector(1, 1)
    }

    onInitialize(){
        this.worth = 1;
        //Star: use gravity and collision to see if this is worth keeping for player experience
        this.body.useGravity = true;
        this.body.collisionType = CollisionType.Active;
    }
    
    spawnFish(){ //Star: this function either needs to be public or be moved to the player
        console.log("Spawn fish")
    }
}