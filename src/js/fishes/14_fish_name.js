import { Vector, CollisionType, Actor, Resource, Color, Rectangle } from "excalibur"
import { Fish } from "../fish"
import { Resources } from "../resources"


export class Fish14 extends Actor { //changed to actor to quick fix a bug

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
    
    getDescription(){
        this.#description = "Despite it's name the Dash Seahorse isn't all that fast.";
        return this.#description
    }

    getColor(){
        this.#color = "Blue";
        return this.#color
    }

    getRarity(){
        this.#rarity = "Uncommon";
        return this.#rarity;
    }
    

        getName(){
        this.#name = "Dash seahorse"
        return this.#name;
    }
}