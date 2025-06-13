import { Actor, CollisionType, Color, Keys, Vector } from "excalibur"
import { Resources } from "./resources.js"
import { Treasure } from "./treasure.js"
import { CollectionArea } from "./collectionArea.js";

export class Player extends Actor {
    lastButtonPress = 0;
    buttonCooldown = 500;
    pickupState = false;
    treasure
    
    constructor(pos) {
        super({
            pos: pos,
            width: Resources.PlayerSprite.width,
            height: Resources.PlayerSprite.height,
            collisionType: CollisionType.Active
        })
    }

    onInitialize(engine) {
        // Gebruik de sprite voor de speler
        this.graphics.use(Resources.PlayerSprite.toSprite())
        // Startpositie van de speler
        this.pos = new Vector(100, 100)
        // Minimum gamepad config staat in Game class

        this.on("collisionstart", (event) => this.handleCollision(event));

    }

    // gamepad movement
    onPreUpdate(engine) {
        let xspeed = 0, yspeed = 0;
        // Log alle gamepads die de browser ziet
        const browserPads = navigator.getGamepads();
        // Probeer eerst Excalibur gamepad
        let pad = engine.input.gamepads.at(0);
        let x = 0, y = 0;
        if (pad && pad.connected) {
        // Check if button 0 (A) is pressed
            if (pad.isButtonPressed(0)) {
                const now = Date.now();
                if (now - this.lastButtonPress > this.buttonCooldown) {
                    let randX = Math.random() * (engine.drawWidth - this.width)
                    let randY = Math.random() * (engine.drawHeight - this.height)
                    this.pos = new Vector(randX, randY)
                    this.lastButtonPress = now
                }
            }
        // Check if button 1 (B) is pressed
        if (pad.isButtonPressed(1)) {
            console.log("B button pressed")
        }
    }
        // Controleer of Excalibur gamepad verbonden is
        if (pad && pad.connected) {
            // Lees de x- en y-as van de linker stick
            x = pad.getAxes(0) ?? 0;
            y = pad.getAxes(1) ?? 0;
        }

         
         
        if (engine.input.keyboard.isHeld(Keys.W)) y = -200;
        if (engine.input.keyboard.isHeld(Keys.S)) y = 200;
        if (engine.input.keyboard.isHeld(Keys.D)) x = 200;
        if (engine.input.keyboard.isHeld(Keys.A)) x = -200;
        

        let move = new Vector(x, y);

            // Use different speed if carrying treasure
            const speed = this.pickupState ? 150 : 300;
            move = move.normalize().scale(speed);
            xspeed = move.x
            yspeed = move.y
        // Zet de snelheid van de speler
        this.vel = new Vector(xspeed, yspeed);

        //camera settings
        //when player gets to border of camera give here via game
        //it will use the edge value to make it so the player can't move past the border
        const bounds = engine.getCameraBounds()
        this.pos.x = Math.max(bounds.left, Math.min(bounds.right, this.pos.x))
        this.pos.y = Math.max(bounds.top, Math.min(bounds.bottom, this.pos.y))    
    }

        handleCollision(event) {

        if (event.other.owner instanceof CollectionArea) {
            this.removeTreasure()
        }
    }

    pickupTreasure(event){
        if(this.pickupState === false){
            this.pickupState = true;
            this.treasure = new Treasure(Player)
            this.addChild(this.treasure)
            this.playPickupSound()
            console.log(this.pickupState)
        } else {return;}
    }

    playPickupSound() {
        Resources.pickup2.play()
    }

    removeTreasure() {
    if (this.treasure) {
        this.removeChild(this.treasure) // remove treasure from player
        this.treasure = null
        this.pickupState = false
        console.log("Treasure removed")
    }
}

}