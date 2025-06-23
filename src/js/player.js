import { Actor, CollisionType, Color, Keys, Vector } from "excalibur"
import { Resources } from "./resources.js"
import { Treasure } from "./treasure.js"
import { CollectionArea } from "./collectionArea.js"
import { Bubble } from "./oxygen_bubble.js"
import { Trash } from "./trash.js"
import { TrashNet } from "./trashnet.js"

export class Player extends Actor {
    lastButtonPress = 0;
    buttonCooldown = 500;
    pickupState = false;
    treasure
    trash
    pickupItemType

    
    constructor(pos, upKey,downKey, leftKey, rightKey,
         gamepadIndex ,sprite, speed, objectSpeed) {
        super({
            pos: pos,
            width: Resources.Diver1.width,
            height: Resources.Diver1.height,
            collisionType: CollisionType.Active
        })
        this.score = 0;
        this.upKey = upKey;
        this.downKey =  downKey;
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.gamepadIndex = gamepadIndex;
        this.sprite = sprite
        this.speed = speed
        this.objectSpeed = objectSpeed
    }

    onInitialize(engine) {
        // Gebruik de sprite voor de speler
        this.graphics.use(this.sprite)
        // Startpositie van de speler
        

        this.on("collisionstart", (event) => this.handleCollision(event));

    }

    // gamepad movement
    onPreUpdate(engine) {
        let xspeed = 0, yspeed = 0;
        // Log alle gamepads die de browser ziet
        
        const browserPads = navigator.getGamepads();
        // Probeer eerst Excalibur gamepad
        let pad = engine.input.gamepads.at(this.gamepadIndex);
        
        
        let x = 0, y = 0;
        if (pad && pad.connected) {
        // Check if button 0 (A) is pressed
            if (pad.isButtonPressed(0)) {
                const now = Date.now();
                if (now - this.lastButtonPress > this.buttonCooldown) {
                    let randX = Math.random() * (engine.drawWidth - this.width)
                    let randY = Math.random() * (engine.drawHeight - this.height)
                    this.vel = new Vector(randX, randY)
                    this.lastButtonPress = now
                }
            }
        // Check if button 1 (B) is pressed
        if (pad.isButtonPressed(1)) {
            console.log("B button pressed")
        }
    }
        // Check if excalibur is connected with gamepad
        if (pad && pad.connected) {
            // read the x- and y-axis input from the joystick
            x = pad.getAxes(0) ?? 0;
            y = pad.getAxes(1) ?? 0;
        }

         
         
        if (engine.input.keyboard.isHeld(this.upKey)) y = -200;
        if (engine.input.keyboard.isHeld(this.downKey)) y = 200;
        if (engine.input.keyboard.isHeld(this.rightKey)) x = 200;
        if (engine.input.keyboard.isHeld(this.leftKey)) x = -200;
        

        let move = new Vector(x, y);

            // Use different speed if carrying treasure
            const speed = this.pickupState ? this.objectSpeed :  this.speed;
            move = move.normalize().scale(speed);
            xspeed = move.x
            yspeed = move.y
        const friction = 0.05 
        // lower = more sliding, higher = less sliding
        this.vel = new Vector(
        this.vel.x + (xspeed - this.vel.x) * friction,
        this.vel.y + (yspeed - this.vel.y) * friction
    );

if (Math.abs(this.vel.x) > Math.abs(this.vel.y)) {
    // Moving horizontally
    if (this.vel.x > 0) {
        this.rotation = Math.PI / 2; 
        // Right
    } else if (this.vel.x < 0) {
        this.rotation = -Math.PI / 2; 
        // Left
    }
} else if (Math.abs(this.vel.y) > 0) {
    // Moving vertically
    if (this.vel.y > 0) {
        this.rotation = Math.PI; 
        // Down
    } else if (this.vel.y < 0) {
        this.rotation = 0; 
        // Up
    }
}
        //camera settings
        //when player gets to border of camera give here via game
        //it will use the edge value to make it so the player can't move past the border
      const bounds = engine.getCameraBounds()
      this.pos.x = Math.max(bounds.left, Math.min(bounds.right, this.pos.x))
      this.pos.y = Math.max(bounds.top, Math.min(bounds.bottom, this.pos.y))    
    }

        handleCollision(event) {

        if (event.other.owner instanceof CollectionArea && this.pickupItemType === 0 || event.other.owner instanceof TrashNet && this.pickupItemType === 1) {

            if (this.treasure && this.pickupState || this.pickupItemType === 1 && this.pickupState) {
                if(this.pickupItemType === 0 ){ //0 = treasure
                    this.removePickedUpItem(0)
                    this.score += 2 //Star: temporary change
                    Resources.PutInTreasure.play()
                } else if (this.pickupItemType === 1){
                    this.removePickedUpItem(1)
                    this.score += 1
                    //Star: add audio here
                }
                
                this.scene.engine.ui.updateScore()
            
            }
        }

        if (event.other.owner && event.other.owner.solid) {
                console.log("Collision with solid object")
                
            }

        if (event.other.owner instanceof Bubble) {
            // @ts-ignore
            if (this.scene.engine.ui && typeof this.scene.engine.ui.timerValue === "number") {
                // @ts-ignore
                this.scene.engine.ui.timerValue += 10
                // @ts-ignore
                this.scene.engine.ui.labelTimer.text = `Oxygen: ${this.scene.engine.ui.timerValue}`
            }
            event.other.owner.bubbleLeft()
        }
    }

    pickupItem(itemType){ 
        this.pickupItemType = itemType;
        if(this.pickupState === false){
            this.pickupState = true;
            if(this.pickupItemType === 0){
                this.treasure = new Treasure(Player)
                this.addChild(this.treasure)
                this.playPickupSound()
            } else if (this.pickupItemType === 1){ 
                this.pickupState = true;
                this.trash = new Trash(Player);
                this.addChild(this.trash); 
            } else{
                console.log("not treasure or trash")
            }
            console.log(this.pickupState)
        } else {return;}
    }

    playPickupSound() {
        Resources.pickup2.play()
    }

    removePickedUpItem(type) {
        if (type === 0){
            this.treasure.kill()
            this.treasure = null
            this.pickupState = false
            console.log("Treasure removed")
        } else if (type === 1){
            this.trash.kill()
            this.trash = null
            this.pickupState = false
            console.log("Trash dropped off")
        }
        console.log(this.pickupState)

    }

}