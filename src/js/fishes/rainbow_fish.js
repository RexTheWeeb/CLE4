import { Vector, CollisionType, Actor, Resource, Color, Rectangle } from "excalibur"
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
        this.graphics.use(Resources.Fish1.toSprite())
        this.pos = new Vector(400, 300) // Place in the center for testing
        this.body.collisionType = CollisionType.Active

        // Debug: Add a colored rectangle behind the sprite
        this.graphics.add(new Rectangle({
            width: 64,
            height: 32,
            color: Color.Red
        }))

        console.log("Fish1 initialized at", this.pos)
    }
    
    

}