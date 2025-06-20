import { Actor, Color, Vector } from "excalibur"
import { Resources } from "./resources.js"
import { Player } from "./player.js"

export class TrashNet extends Actor {
    constructor(pos){
        super({
            pos: pos,
            width: Resources.Net.width,
            height: Resources.Net.height,
            scale: new Vector(3,3)
        })
        this.graphics.use(Resources.Net.toSprite())
    }

    onInitialize() {
        this.on("collisionstart", (event) => this.handleCollision(event))
    }

    handleCollision(event) {
        if (
            (event.other.owner instanceof Player) &&
            event.other.owner.pickupState &&
            event.other.owner.trash
        ) {
            //play sound
        }
    }
}