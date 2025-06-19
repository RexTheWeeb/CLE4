import { Actor, Vector } from "excalibur";
import { Resources, ResourceLoader } from './resources.js'
export class DisplayCase extends Actor{
    constructor(pos){
        super({            
            pos: pos,
            width: Resources.Diver1.width,
            height: Resources.Diver1.height,})
    }
            onInitialize(engine) {
                this.graphics.use(Resources.DisplayEmpty.toSprite())
                this.scale = new Vector(2, 2) // scale up by 2x

            }
}