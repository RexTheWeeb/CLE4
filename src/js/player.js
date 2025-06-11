import { Actor, Keys, Vector } from "excalibur"
import { Resources } from "./resources.js"

export class Player extends Actor {

    constructor(pos) {
        super({
            pos: pos,
            width: Resources.PlayerSprite.width,
            height: Resources.PlayerSprite.height,

        })
    }

     onInitialize() {
        this.graphics.use(Resources.PlayerSprite.toSprite())
        this.pos = new Vector(100, 100)
     }

}