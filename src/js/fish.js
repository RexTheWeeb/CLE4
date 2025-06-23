import { Vector, CollisionType, Actor } from "excalibur"


export class Fish extends Actor {

    constructor(xpos, ypos) {
        super()
        //Star: set sprites in other files
        this.pos = new Vector(400, 300) //Star: set the x and y pos so it spawns close to the collected trash
    }

    onInitialize(){
        this.body.collisionType = CollisionType.Active;
    }
    
    #roam(){
        
    }

}