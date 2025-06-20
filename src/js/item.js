import { Actor } from "excalibur";

export class Item extends Actor{
    sprite
    constructor(pos, sprite){
        super({
            pos: pos,
            width: sprite.width,
            height: sprite.height,
        })
        this.sprite = sprite
    }
    onInitialize(){
        this.graphics.use(this.sprite)
    }
}