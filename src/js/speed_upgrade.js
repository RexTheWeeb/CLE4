import { Actor, Vector } from "excalibur"
import { Resources } from './resources'

export class SpeedUpgrade extends Actor {
    constructor() {
        super()
        this.graphics.use(Resources.SpeedUpgrade.toSprite())
        
        this.pos = new Vector (600,600)
        this.scale = new Vector (0.1, 0.1)
    }
}