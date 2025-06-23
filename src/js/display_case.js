import { Actor, Vector } from "excalibur";
import { Resources, ResourceLoader } from './resources.js'
export class DisplayCase extends Actor{
    constructor(pos, value, sprite){
        value
        sprite
        super({            
            pos: pos,
            width: Resources.DisplayEmpty.width,
            height: Resources.DisplayEmpty.height,})
            this.value = value
            this.sprite = sprite
    }
            onInitialize(engine) {
                if (this.value === true){
                    this.graphics.use(this.sprite)
                    this.scale = new Vector(2, 2) 
                } else{
                    this.graphics.use(Resources.DisplayEmpty.toSprite())
                    this.scale = new Vector(2, 2)
                }
            }
}