import { Actor, Vector } from "excalibur"
import { Resources } from "./resources.js"

export class Treasure extends Actor {

    // Makes treasure and places it randomly on the map
    constructor() {
        super({
            width: Resources.PlayerSprite.width,
            height: Resources.PlayerSprite.height,
        })
        this.graphics.use(Resources.Treasure.toSprite())
        this.pos = new Vector(Math.random() * 1280, Math.random() * 720)
        this.scale = new Vector(0.3, 0.3)

        this.events.on("exitviewport", (e) => this.treasureGrabbed(e))
    }


    // Respawns treasure
    treasureGrabbed(e) {
        e.target.pos = new Vector(Math.random() * 1280, Math.random() * 720)
    }

    
}