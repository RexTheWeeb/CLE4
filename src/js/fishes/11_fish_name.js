import { Vector, CollisionType, Actor, Resource, Color, Rectangle } from "excalibur"
import { Fish } from "../fish"
import { Resources } from "../resources"


export class Fish11 extends Actor { //changed to actor to quick fix a bug

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
        this.#description = "This odd fella has huge eyes and tends to live more near the shores.";
        return this.#description
    }

    getColor(){
        this.#color = "Grey";
        return this.#color
    }

    getRarity(){
        this.#rarity = "Uncommon";
        return this.#rarity;
    }
    
    getName(){
        this.#name = "Goober grouper"
        return this.#name;
    }

}