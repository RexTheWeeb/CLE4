import { Actor, Vector } from "excalibur"
import { Player } from "./player"
import { Resources } from "./resources"

export class Pickup extends Actor {

        pickUpType

        constructor(sprite, type) {
        super({
            width: Resources.Diver1.width,
            height: Resources.Diver1.height,
        })
        this.graphics.use(sprite)
        this.pos = new Vector(Math.random() * 1280, Math.random() * 720)
        this.scale = new Vector(0.3, 0.3)
        this.pickUpType = type;
    }

    onInitialize(engine) {
        this.on("collisionstart", (event) => this.handleCollision(event));
    }

    handleCollision(event) {
        if(event.other.owner instanceof Player) {
            if (event.other.owner.pickupState === false){
                //add if statement here for trash or treasure
                if(this.pickUpType === 0){
                    event.other.owner.pickupItem(this.pickUpType)
                    this.kill()
                } else if(this.pickUpType === 1){
                    event.other.owner.pickupItem(this.pickUpType)
                    this.kill();
                }
                
            }
        }
    }    }