import { Actor, Vector, CollisionType } from "excalibur"
import { Resources, } from "./resources.js"

export const bubbleSpawnArray = [
    new Vector(100, 100),
    new Vector(200, 200),
    new Vector(300, 300),
    new Vector(400, 400),
    new Vector(500, 500),
    new Vector(600, 600),
    new Vector(700, 700),
    new Vector(800, 800),
    new Vector(900, 900),
    new Vector(1000, 1000)
]

export class Bubble extends Actor {
    constructor(fixed = false) {
        super({ width: 100, height: 100, collisionType: CollisionType.Active })
        this.graphics.use(Resources.Bubbles.toSprite())
        this.scale = new Vector(0.2, 0.2)
        if (fixed && bubbleSpawnArray.length > 0) {
           
            const index = Math.floor(Math.random() * bubbleSpawnArray.length)
            this.pos = bubbleSpawnArray[index].clone()
            bubbleSpawnArray.splice(index, 1)
            this.vel = new Vector(0, 0) 
        } else {
            const x = Math.random() * 1280
            const y = 720
            this.pos = new Vector(x, y)
            this.vel = new Vector(0, -50)
        }
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