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
        let pad = engine.input.gamepads.at(0);
        let x = 0, y = 0;
        // Log alleen als de verbindingsstatus verandert
        if (pad && pad.connected) {
            x = pad.getAxes(0) ?? 0;
            y = pad.getAxes(1) ?? 0;
            if (!this._wasPadConnected) console.log('Gamepad verbonden');
            this._wasPadConnected = true;
        } else {
            const browserPads = navigator.getGamepads();
            if (browserPads && browserPads[0] && browserPads[0].connected) {
                x = browserPads[0].axes[0] ?? 0;
                y = browserPads[0].axes[1] ?? 0;
                if (!this._wasPadConnected) console.log('Gamepad verbonden');
                this._wasPadConnected = true;
            } else {
                if (this._wasPadConnected || this._wasPadConnected === undefined) console.log('Geen gamepad');
                this._wasPadConnected = false;
            }
        }
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