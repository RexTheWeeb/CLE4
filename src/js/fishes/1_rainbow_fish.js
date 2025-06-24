import { Vector, CollisionType, Actor, Resource, Color, Rectangle } from "excalibur"
import { Fish } from "../fish"
import { Resources } from "../resources"


export class Fish1 extends Actor { //changed to actor to quick fix a bug

    #description
    #color
    #rarity
    #name

    constructor(position) {
        super({
            width: Resources.Fish1.width,
            height: Resources.Fish1.height,
        })
    }

    onInitialize(){
        // this.graphics.use(Resources.Fish1.toSprite())
        // this.pos = new Vector(400, 300) // Place in the center for testing
        // this.body.collisionType = CollisionType.Active

        // // Debug: Add a colored rectangle behind the sprite
        // this.graphics.add(new Rectangle({
        //     width: 64,
        //     height: 32,
        //     color: Color.Red
        // }))

        // console.log("Fish1 initialized at", this.pos)
    }
    
    getDescription(){
        this.#description = "The rainbow fish is one of the most pretty fish in the sea, even sharks don't eat them due to their pretty colors";
        return this.#description
    }

    getColor(){
        this.#color = "Rainbow";
        return this.#color
    }

    getRarity(){
        this.#rarity = "Very rare";
        return this.#rarity;
    }
    
    getName(){
        this.#name = "Rainbow Jack"
        return this.#name;
    }

}