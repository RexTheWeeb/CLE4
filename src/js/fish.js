import { Vector, CollisionType, Actor } from "excalibur"


export class Fish extends Actor {

    fishId
    rarity
    color
    sprite

    randomx
    randomy

    constructor(xpos, ypos) {
        super({
            collisionType: CollisionType.Active
        })
        //Star: set sprites in other files
        this.pos = new Vector(xpos, ypos) //Star: set the x and y pos so it spawns close to the collected trash
    }

    onInitialize(){
        this.roam();
    }
    
    roam(){
        //start point + or - random vector
        console.log("start roaming")

        if(this.randomx > 0){
            this.graphics.flipHorizontal = false;
        } else if (this.randomy < 0) {
            this.graphics.flipHorizontal = true;
        }
        /*  
        this.actions.moveBy(new Vector(-100, -100), 1000)
        this.actions.blink(200, 100, 5);
        */
    }

}