import { Actor, CollisionType, Color, Vector } from "excalibur";
import { Resources } from "./resources";

export class Pillar extends Actor{
    constructor(pos, width, height){
        super({
            pos: pos,
            width: width,
            height: height,
            collisionType: CollisionType.Fixed
        })
    }
    onInitialize(){
        this.graphics.use(Resources.Pillar.toSprite()).scale = new Vector(0.3, 0.3)
    }
}