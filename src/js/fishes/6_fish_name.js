import { Vector, CollisionType, Actor, Resource, Color, Rectangle } from "excalibur"
import { Fish } from "../fish"
import { Resources } from "../resources"


export class Fish6 extends Actor { //changed to actor to quick fix a bug

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
        this.#description = "Fish6";
        return this.#description
    }

    getColor(){
        this.#color = "A kind of purple";
        return this.#color
    }

    getRarity(){
        this.#rarity = "Uncommon";
        return this.#rarity;
    }

    getName(){
        this.#name = "Sharkcarp"
        return this.#name;
    }
    

}