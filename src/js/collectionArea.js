import { Actor, Color } from "excalibur"
import { Resources } from "./resources.js"
import { Player } from "./player.js"
import { Treasure } from "./treasure.js"

export class CollectionArea extends Actor {
    constructor(pos){
        super({
            pos: pos,
            width: 200,
            height: 200,
            color: Color.Yellow
        })
    }

    onInitialize() {
        this.on("collisionstart", (event) => this.handleCollision(event))
    }

    handleCollision(event) {
        if (
            (event.other.owner instanceof Player) &&
            event.other.owner.pickupState &&
            event.other.owner.treasure
        ) {
            Resources.PutInTreasure.play()
            // Call the treasure's respawn method
            // this.treasure.treasureGrabbed(this.pickup)
            // console.log("Treasure Respawned")
        }
    }
}