import { Actor, Color, Keys, Vector } from "excalibur"
import { Resources } from "./resources.js"
import { Player } from "./player.js"
import { Treasure } from "./treasure.js"

export class Player2 extends Player {
    constructor(pos) {
        super(pos)
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
        if (event.other.owner instanceof Treasure) {
            event.other.owner.kill();
            // Play pickup sound effect, force reload if needed
            Resources.PickupSound.stop();
            Resources.PickupSound.play();
            const newTreasure = new Treasure();
            // @ts-ignore
            this.scene.add(newTreasure);
        }
    }
}