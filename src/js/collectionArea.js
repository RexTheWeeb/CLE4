import { Actor, Color } from "excalibur";

export class CollectionArea extends Actor {
    constructor(pos){
        super({
            pos: pos,
            width: 200,
            height: 200,
            color: Color.Yellow
        })
    }
}