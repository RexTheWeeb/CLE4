import { Vector, CollisionType, Actor, Resource, Color, Rectangle } from "excalibur"
import { Fish } from "../fish"
import { Resources } from "../resources"


export class Fish5 extends Actor { //changed to actor to quick fix a bug

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
        this.#description = "Fish5";
        return this.#description
    }

    getColor(){
        this.#color = "Purple";
        return this.#color
    }

    getRarity(){
        this.#rarity = "Rare";
        return this.#rarity;
    }
    
        getName(){
        this.#name = "Purple grouper"
        return this.#name;
    }
}