import { Actor, Vector } from "excalibur"
import { Player } from "./player"
import { Resources } from "./resources"

export const treasureSpawnArray = [
    new Vector(1376, 1136),
    new Vector(512, 1200),
    new Vector(768, 1808),
    new Vector(832, 4016),
    new Vector(1552, 2400),
    new Vector(1568, 1424),
    new Vector(224, 2784),
    new Vector(112, 2256),
    new Vector(368, 3568),
    new Vector(1248, 3936),  
    new Vector(1312, 4576),
]

export const trashSpawnArray = [
    new Vector(1312, 1072),
    new Vector(544, 1152),
    new Vector(688, 1808),
    new Vector(880, 3936),
    new Vector(1488, 2320),
    new Vector(1472, 1408),
    new Vector(176, 2688),
    new Vector(256, 2256),
    new Vector(464, 3504),
    new Vector(1408, 3936),
    new Vector(1232, 4480),
]

export class Pickup extends Actor {

        pickUpType

        constructor(sprite, type) {
        super({
            width: Resources.Diver1.width,
            height: Resources.Diver1.height,
        })
        this.graphics.use(sprite)
        let spawnList
            if (type === 0) {
                spawnList = treasureSpawnArray
            } else if (type === 1) {
                spawnList = trashSpawnArray
            }
        const index = Math.floor(Math.random() * spawnList.length)
        this.pos = spawnList[index].clone()
        spawnList.splice(index, 1) 
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