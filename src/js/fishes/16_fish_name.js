import { Vector, CollisionType, Actor, Resource, Color, Rectangle } from "excalibur"
import { Fish } from "../fish"
import { Resources } from "../resources"


export class Fish16 extends Actor { //changed to actor to quick fix a bug

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
        this.#description = "Fish16";
        return this.#description
    }

    getColor(){
        this.#color = "Purple with green";
        return this.#color
    }

    getRarity(){
        this.#rarity = "Rare";
        return this.#rarity;
    }
    
        getName(){
        this.#name = "Joker Tuna"
        return this.#name;
    }

}