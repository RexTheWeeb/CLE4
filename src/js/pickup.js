import { Actor, Vector } from "excalibur"
import { Player } from "./player"
import { Resources } from "./resources"

const spawnArea = [
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

export class Pickup extends Actor {

        constructor() {
        super({
            width: Resources.Diver1.width,
            height: Resources.Diver1.height,
        })
        this.graphics.use(Resources.Treasure.toSprite())
        const index = Math.floor(Math.random() * spawnArea.length)
        this.pos = spawnArea[index].clone()
        this.scale = new Vector(0.3, 0.3)
    }

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