import { Actor, Vector } from "excalibur"
import { Player } from "./player"
import { Player2 } from "./player2"
import { Resources } from "./resources"

export class Pickup extends Actor {

        constructor() {
        super({
            width: Resources.PlayerSprite.width,
            height: Resources.PlayerSprite.height,
        })
        this.graphics.use(Resources.Treasure.toSprite())
        this.pos = new Vector(Math.random() * 1280, Math.random() * 720)
        this.scale = new Vector(0.3, 0.3)}

    onInitialize(engine) {
        this.on("collisionstart", (event) => this.handleCollision(event));

    }

    handleCollision(event) {
        if(event.other.owner instanceof Player || Player2) {
            if (event.other.owner.pickupState === false){
                event.other.owner.pickupTreasure()
                console.log('hello')
                this.kill()
            }
        }
    }    }