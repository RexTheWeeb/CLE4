import { Actor, Vector } from "excalibur"
import { Resources } from "./resources.js"


export class Treasure extends Actor {

    // Makes treasure and places it randomly on the map
    constructor(player, sprite) {
        super()
        this.graphics.use(sprite)
        this.pos = new Vector(0, 0)
    }


    // Respawns treasure
    treasureGrabbed(e) {
        e.target.pos = new Vector(Math.random() * 1280, Math.random() * 720)
    }

    
}