import { Actor, Keys, Vector } from "excalibur"
import { Resources } from "./resources.js"

export class Player extends Actor {

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
    }

    // gamepad movement
    onPreUpdate(engine, delta) {
        let xspeed = 0, yspeed = 0;
        // Log alle gamepads die de browser ziet
        const browserPads = navigator.getGamepads();
        console.log('navigator.getGamepads():', browserPads);
        // Probeer eerst Excalibur gamepad
        let pad = engine.input.gamepads.at(0);
        let x = 0, y = 0;
        // Controleer of Excalibur gamepad verbonden is
        if (pad && pad.connected) {
            // Lees de x- en y-as van de linker stick
            x = pad.getAxes(0) ?? 0;
            y = pad.getAxes(1) ?? 0;
            console.log('Excalibur gamepad:', pad, 'Axis:', x, y);
        } else if (browserPads && browserPads[0]) {
            // Fallback: gebruik browser Gamepad API
            x = browserPads[0].axes[0] ?? 0;
            y = browserPads[0].axes[1] ?? 0;
            console.log('Browser gamepad:', browserPads[0], 'Axis:', x, y);
        } else {
            // Geen gamepad gevonden
            console.log('Geen gamepad gevonden of niet verbonden.');
        }
        // Zet snelheid op basis van stick input (deadzone uit voor debug)
        xspeed = x * 200;
        yspeed = y * 200;
        // Fallback: toetsenbordbesturing als er geen gamepad input is
        if (xspeed === 0 && yspeed === 0) {
            if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) yspeed = -200;
            if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) yspeed = 200;
            if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) xspeed = 200;
            if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) xspeed = -200;
        }
        // Zet de snelheid van de speler
        this.vel = new Vector(xspeed, yspeed);
    }

}