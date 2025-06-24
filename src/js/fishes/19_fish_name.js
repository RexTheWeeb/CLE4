import { Vector, CollisionType, Actor, Resource, Color, Rectangle } from "excalibur"
import { Fish } from "../fish"
import { Resources } from "../resources"


export class Fish19 extends Actor { //changed to actor to quick fix a bug

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
        this.#description = "This fish likes it to copy other fish their looks for survival purpuses. Without disguise it's a grey fish.";
        return this.#description
    }

    getColor(){
        this.#color = "Grey";
        return this.#color
    }

    getRarity(){
        this.#rarity = "Common";
        return this.#rarity;
    }
    
        getName(){
        this.#name = "Copycat Snapper"
        return this.#name;
    }

}