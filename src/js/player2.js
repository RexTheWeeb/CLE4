import { Actor, Color, Keys, Vector } from "excalibur"
import { Resources } from "./resources.js"
import { Player } from "./player.js"
import { Treasure } from "./treasure.js"
import { CollectionArea } from "./collectionArea.js"

export class Player2 extends Player {
    constructor(pos) {
        super(pos)
        this.score = 0;
    }


    onInitialize(engine) {
        // Gebruik een andere sprite voor speler 2
        this.graphics.use(Resources.Player2Sprite.toSprite())
        this.pos = new Vector(200, 200) // andere startpositie
         this.on("collisionstart", (event) => this.handleCollision(event));

    }

    onPreUpdate(engine) {
        let xspeed = 0, yspeed = 0;
        // Gebruik gamepad 2 (index 1)
        let pad = engine.input.gamepads.at(1);
        let x = 0, y = 0;
        if (pad && pad.connected) {
            x = pad.getAxes(0) ?? 0;
            y = pad.getAxes(1) ?? 0;
        }
        xspeed = x * 200;
        yspeed = y * 200;
        // Fallback: pijltjestoetsen voor speler 2
        if (xspeed === 0 && yspeed === 0) {
            if (engine.input.keyboard.isHeld(Keys.Up)) yspeed = -200;
            if (engine.input.keyboard.isHeld(Keys.Down)) yspeed = 200;
            if (engine.input.keyboard.isHeld(Keys.Right)) xspeed = 200;
            if (engine.input.keyboard.isHeld(Keys.Left)) xspeed = -200;
        }
        
        this.vel = new Vector(xspeed, yspeed);
    }

    handleCollision(event) {

        if (event.other.owner instanceof CollectionArea) {
            if (this.treasure && this.pickupState) {
                this.removeTreasure()
                this.score += 1
                this.scene.engine.ui.updateScore()
            }
        }
    }

    removeTreasure() {
        if (this.treasure) {
            this.treasure.kill()
            this.treasure = null
            this.pickupState = false
            console.log("Treasure removed")

     }
}

pickupTreasure(event){
    if(this.pickupState === false){
        this.pickupState = true;
        this.treasure = new Treasure(Player2)
        this.addChild(this.treasure)
        this.playPickupSound()
        console.log(this.pickupState)
    } else {return;}
}

playPickupSound() {
    Resources.Pickup.play()
}
}