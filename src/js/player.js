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
        this.graphics.use(Resources.PlayerSprite.toSprite())
        this.pos = new Vector(100, 100)
        // Verwijderd: minimum gamepad config, dit hoort in Game class
     }

     onPreUpdate(engine, delta) {
        let xspeed = 0, yspeed = 0;
        // Altijd loggen wat de browser ziet
        const browserPads = navigator.getGamepads();
        console.log('navigator.getGamepads():', browserPads);
        // Probeer eerst Excalibur gamepad
        let pad = engine.input.gamepads.at(0);
        let x = 0, y = 0;
        // Gebruik de juiste property: 'connected' in plaats van 'isConnected'
        if (pad && pad.connected) {
            x = pad.getAxes(0) ?? 0;
            y = pad.getAxes(1) ?? 0;
            console.log('Excalibur gamepad:', pad, 'Axis:', x, y);
        } else if (browserPads && browserPads[0]) {
            x = browserPads[0].axes[0] ?? 0;
            y = browserPads[0].axes[1] ?? 0;
            console.log('Browser gamepad:', browserPads[0], 'Axis:', x, y);
        } else {
            console.log('Geen gamepad gevonden of niet verbonden.');
        }
        // Deadzone tijdelijk uitgeschakeld voor debug
        xspeed = x * 200;
        yspeed = y * 200;
        // Fallback: allow keyboard movement if geen gamepad input
        if (xspeed === 0 && yspeed === 0) {
            if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) yspeed = -200;
            if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) yspeed = 200;
            if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) xspeed = 200;
            if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) xspeed = -200;
        }
        this.vel = new Vector(xspeed, yspeed);
    }

}