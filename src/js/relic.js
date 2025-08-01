import { Resources } from "./resources";
import { Actor, Vector } from "excalibur";
import { Player } from "./player.js";

export class Relic extends Actor {
    constructor(pos, sprite, type) {
        super({
            width: sprite.width,
            height: sprite.height,
        });
        this.graphics.use(sprite).scale = new Vector(2, 2);
        this.pos = pos;
        this.scale = new Vector(1, 1);
        this.type = type
    }

    onInitialize(engine) {
        this.on("collisionstart", (event) => this.handleCollision(event));
    }

    handleCollision(event) {
        if (event.other.owner instanceof Player) {
            if (event.other.owner.pickupState === false) {
                event.other.owner.pickupItem(this.type);
                this.kill();
            }
        }
    }
}