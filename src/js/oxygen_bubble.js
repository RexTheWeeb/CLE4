import { Actor, Vector, CollisionType } from "excalibur"
import { Resources, } from "./resources.js"

export class Bubble extends Actor {
    constructor() {
        super({width: 100, height: 100, CollisionType:CollisionType.active})
        this.graphics.use(Resources.Bubbles.toSprite())
        const x = Math.random() * 1280
        const y = 720
        this.pos = new Vector(x, y)
        this.vel = new Vector(0, -50)
        this.scale = new Vector(0.2, 0.2)
    }

    onPreUpdate() {
        if (this.pos.y < -20) {
            this.bubbleLeft()
        }
    }

    bubbleLeft() {
        const x = Math.random() * 1280
        const y = 720
        this.pos = new Vector(x, y)
        this.vel = new Vector(0, -50)
        this.scale = new Vector(0.2, 0.2)
    }
}