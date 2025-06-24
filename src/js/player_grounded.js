import { Actor, CollisionType, Keys, Vector } from "excalibur";
import { Resources } from "./resources";

export class PlayerGrounded extends Actor {
    #speed = 200;
    score = 0;
    sprite
    keyleft
    keyright
    constructor(pos, keyleft, keyright, sprite, gamepadIndex) {
        super({
            pos: pos,
            width: Resources.Diver1.width,
            height: Resources.Diver1.height,
            collisionType: CollisionType.Passive
        })
        this.sprite = sprite
        this.keyleft = keyleft
        this.keyright = keyright
        this.gamepadIndex = gamepadIndex
    }
        onInitialize(engine) {
            this.graphics.use(this.sprite)    
            this.on("collisionstart", (event) => this.handleCollision(event));
        }
        
    handleCollision(event) {
        
    }

        onPreUpdate(engine) {
            let xspeed = 0;
            let yspeed = this.vel.y; 
    
            if (engine.input.keyboard.isHeld(this.keyleft)) {
                xspeed = -this.#speed;
            }
    
            if (engine.input.keyboard.isHeld(this.keyright)) {
                xspeed = this.#speed;
            } 

        const pad = engine.input.gamepads.at(this.gamepadIndex);
        if (pad && pad.connected) {
            const axisX = pad.getAxes(0) ?? 0;
            // Optionally, you can use up/down with axisY if needed
            xspeed = axisX * this.#speed;
        }
    
            this.vel = new Vector(xspeed, yspeed);
        }
    

    increaseOxygenBar(amount) {
        this.oxygenBarLength += 50;
    }

    increaseSpeed(amount) {
        this.#speed += 50;
    }     
}