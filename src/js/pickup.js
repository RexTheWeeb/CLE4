import { Actor, Vector } from "excalibur"
import { Player } from "./player"
import { Resources } from "./resources"

const spawnArea = [
    new Vector(1376, 1136),
    new Vector(512, 1200),
    new Vector(768, 1808),
]

export class Pickup extends Actor {

        pickUpType

        constructor(sprite, type) {
        super({
            width: Resources.Diver1.width,
            height: Resources.Diver1.height,
        })
        this.graphics.use(sprite)
        const index = Math.floor(Math.random() * spawnArea.length)
        this.pos = spawnArea[index].clone()
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