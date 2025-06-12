import { Actor, Color, Keys, Vector } from "excalibur"
import { Resources } from "./resources.js"
import { Treasure } from "./treasure.js"

export class Player extends Actor {
    lastButtonPress = 0;
    buttonCooldown = 500;
    
    constructor(pos) {
        super({
            pos: pos,
            width: Resources.PlayerSprite.width,
            height: Resources.PlayerSprite.height,
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

         
         
        if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) y = -200;
        if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) y = 200;
        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) x = 200;
        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) x = -200;
        

        let move = new Vector(x, y);

            move   = move.normalize().scale(300);
            xspeed = move.x
            yspeed = move.y
        // Zet de snelheid van de speler
        this.vel = new Vector(xspeed, yspeed);
    }

        handleCollision(event) {

        if (event.other.owner instanceof Treasure) {
            event.other.owner.kill();
            const newTreasure = new Treasure()
            // @ts-ignore
            this.scene.add(newTreasure)
        }
    }

}