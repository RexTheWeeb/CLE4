import { Vector, CollisionType, Actor, Resource, Color, Rectangle } from "excalibur"
import { Fish } from "../fish"
import { Resources } from "../resources"


export class Fish13 extends Actor { //changed to actor to quick fix a bug

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
        this.#description = "A friendly crab that's often found chilling close to divers, occasionally coming closer to take a curious look at divers";
        return this.#description
    }

    getColor(){
        this.#color = "Golden yellow";
        return this.#color
    }

    getRarity(){
        this.#rarity = "Rare";
        return this.#rarity;
    }
    
        getName(){
        this.#name = "Sabastian crab"
        return this.#name;
    }

}