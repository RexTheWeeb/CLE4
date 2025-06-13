import { Actor, Color } from "excalibur"
import { Resources } from "./resources.js"
import { Player } from "./player.js"

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
        // Play sound when a player puts treasure in the collection area
        if (
            (event.other.owner instanceof Player) &&
            event.other.owner.pickupState &&
            event.other.owner.treasure
        ) {
            Resources.PutInTreasure.play()
        }
    }
}