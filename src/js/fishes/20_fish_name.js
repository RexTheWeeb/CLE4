import { Vector, CollisionType, Actor, Resource, Color, Rectangle } from "excalibur"
import { Fish } from "../fish"
import { Resources } from "../resources"


export class Fish20 extends Actor { //changed to actor to quick fix a bug

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
        this.#description = "A very rare fish, only a few have ever been seen. If two find to happen each other they tend to end up in a fight over their territory.";
        return this.#description
    }

    getColor(){
        this.#color = "Green";
        return this.#color
    }

    getRarity(){
        this.#rarity = "Extremely rare";
        return this.#rarity;
    }
    
    getName(){
        this.#name = "KingFish"
        return this.#name;
    }

}