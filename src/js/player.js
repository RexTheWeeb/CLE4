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
    relic
    pickupItemType
    engine

    
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
        this.engine = engine        

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
            // console.log("Current player speed:", this.speed)
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
                    Resources.trashputinsound.play()
                    //Star: add audio here
                }
                
                // @ts-ignore
                this.scene.engine.ui.updateScore()
            }
        }
        
        if (event.other.owner instanceof CollectionArea && this.pickupState) {
                if(this.pickupItemType === 2 ){ 
                    this.removePickedUpItem(2)
                    this.score += 10
                    this.placeInMuseum(2)
                    Resources.PutInTreasure.play()
                }else if(this.pickupItemType === 3 ){ 
                    this.removePickedUpItem(2)
                    this.score += 10
                    this.placeInMuseum(3)
                    Resources.PutInTreasure.play()
                }else if(this.pickupItemType === 3 ){ 
                    this.removePickedUpItem(2)
                    this.score += 10
                    this.placeInMuseum(4)
                    Resources.PutInTreasure.play()
                }
            
                this.scene.engine.ui.updateScore()

        }


        if (event.other.owner && event.other.owner.solid) {
                console.log("Collision with solid object")
        }

        if (event.other.owner instanceof Bubble) {
            if (
        this.scene.engine.ui &&
        typeof this.scene.engine.ui.timerValue === "number"
        ) {
        const maxOxygen = this.scene.engine.ui.maxTime || 60;
        this.scene.engine.ui.timerValue = Math.min(this.scene.engine.ui.timerValue + 10, maxOxygen);
        if (this.scene.engine.ui.labelTimer) {
            this.scene.engine.ui.labelTimer.text = `Oxygen: ${this.scene.engine.ui.timerValue}`;
        }
        if (this.scene.engine.ui.oxygenBar) {
            this.scene.engine.ui.oxygenBar.setValue(this.scene.engine.ui.timerValue);
        }
        }
        event.other.owner.bubbleLeft();
        }
        }

    pickupItem(itemType){ 
        this.pickupItemType = itemType;
        if(this.pickupState === false){
            this.pickupState = true;

            if(this.pickupItemType === 0){
                this.treasure = new Treasure(Player, Resources.Treasure.toSprite())
                this.addChild(this.treasure)
                this.playPickupSound()

            } else if (this.pickupItemType === 1){ 
                this.pickupState = true;
                this.trash = new Trash(Player);
                this.addChild(this.trash); 
                Resources.trashpickup.play()

            } else if(this.pickupItemType === 2 || 3 || 4){
                this.pickupState = true

                //all this code is to check which relic and add the just image
                if (this.pickupItemType === 2){this.relic = new Treasure(Player, Resources.RelicAmulet.toSprite())
                    this.relic.scale = new Vector(1.5, 1.5)
                }
             else if(this.pickupItemType === 3){this.relic = new Treasure(Player, Resources.RelicMask.toSprite())
                this.relic.scale = new Vector(1.5, 1.5)
             }
             else if(this.pickupItemType === 4){this.relic = new Treasure(Player, Resources.RelicStatue.toSprite())
                this.relic.scale = new Vector(1.5, 1.5)
             }
             this.addChild(this.relic)
            }
            else{
                console.log("not treasure or trash")
            }
            console.log(this.pickupState)
        } else {return;}
    }

    playPickupSound() {
        Resources.pickup2.play()
    }

removePickedUpItem(type) {
    if (type === 0) {
        if (this.treasure) {
            this.treasure.kill()
            this.treasure = null
            this.pickupState = false
        }
    } else if (type === 1) {
        if (this.trash) {
            this.trash.kill()
            this.trash = null
            this.pickupState = false
        }
    } else if (type === 2) {
        if (this.relic) {
            this.relic.kill()
            this.relic = null
            this.pickupState = false
        }
    }
    console.log(this.pickupState)
}

    placeInMuseum(type){
        if(type ===2){
            console.log("hello")
            this.engine.scenes.museum.setAmulet()
            console.log("hi")
        }else if(type ===3){
            this.engine.scenes.museum.setMask()
        }else if(type ===4){
            this.engine.scenes.museum.setStatue()
        }
    }
}