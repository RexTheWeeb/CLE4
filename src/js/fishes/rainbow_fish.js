import { Vector, CollisionType, Actor, Resource } from "excalibur"
import { Fish } from "../fish"
import { Resources } from "../resources"


export class Fish1 extends Fish {

    fishId
    rarity
    color
    sprite

    constructor(position) {
        super({
            width: Resources.Fish1.width,
            height: Resources.Fish1.height,
            pos: position
        })
        this.graphics.use(Resources.Fish1.toSprite())

        this.fishId = 19;
        this.rarity = "Very Rare"
        this.color = "Rainbow";
        this.sprite = Resources.Fish1.toSprite();
        console.log(`spawn fish here ${position}`)
    }

    onInitialize(){
        this.body.collisionType = CollisionType.Active;
    }
    
    

}