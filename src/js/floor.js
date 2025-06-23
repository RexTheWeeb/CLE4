import { Actor, CollisionType, Color } from "excalibur";

export class Floor extends Actor{
    constructor(pos, width, height){
        super({
            pos: pos,
            width: width,
            height: height,
            color: Color.Azure,
            collisionType: CollisionType.Fixed
        })
    }
}