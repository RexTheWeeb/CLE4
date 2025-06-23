import { Actor, Vector } from "excalibur"
import { Resources } from './resources.js'

export class CatVendor extends Actor {
    constructor(pos) {
        super({
            pos: pos,
            width: 64,
            height: 64
        })
    }

    onInitialize(engine) {
        const sprite = Resources.Catsuit.toSprite()
        sprite.width = 64
        sprite.height = 64
        this.graphics.use(sprite)
    }
}