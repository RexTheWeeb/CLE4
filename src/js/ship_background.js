import { Actor, Vector } from "excalibur"
import { Resources } from './resources'

export class SupplyBackground extends Actor {
    onInitialize(engine) {
        this.graphics.use(Resources.SupplyBackground.toSprite())
        this.pos = new Vector(640, 360)
    }
}