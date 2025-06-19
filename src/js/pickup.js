import { Actor, Vector } from "excalibur"
import { Player } from "./player"
import { Resources } from "./resources"

export class Pickup extends Actor {

        constructor() {
        super({
            width: Resources.Diver1.width,
            height: Resources.Diver1.height,
        })
        this.graphics.use(Resources.Treasure.toSprite())
        this.pos = new Vector(Math.random() * 1280, Math.random() * 720)
        this.scale = new Vector(0.3, 0.3)}

    onInitialize(engine) {
        this.on("collisionstart", (event) => this.handleCollision(event));

    }

    handleCollision(event) {
        if(event.other.owner instanceof Player) {
            if (event.other.owner.pickupState === false){
                event.other.owner.pickupTreasure()
                console.log('hello')
                this.kill()
            }
        }
    }    }