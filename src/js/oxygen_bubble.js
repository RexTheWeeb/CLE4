import { Actor, Vector, CollisionType, Timer } from "excalibur"
import { Resources, } from "./resources.js"
import { Player } from "./player.js"

export const bubbleSpawnArray = [
    new Vector(928, 1024),
    new Vector(1232, 1696),
    new Vector(624, 2096),
    new Vector(400, 2768),
    new Vector(1120, 3328),
    new Vector(624, 4352),
    new Vector(1120, 5312),
    new Vector(128, 5008)
]

export class Bubble extends Actor {
    spawnPoint;

    constructor(spawnPoint) {
        super({ width: 100, height: 100, collisionType: CollisionType.Active });
        this.graphics.use(Resources.Bubbles.toSprite());
        this.scale = new Vector(0.2, 0.2);
        this.spawnPoint = spawnPoint.clone(); 
        this.respawn();
    }

    onInitialize(engine) {
        this.on("collisionstart", (event) => this.hitSomething(event));
    }

    respawn() {
        this.pos = this.spawnPoint.clone();
        this.vel = Vector.Zero;
        this.visible = true;
    }

    onPreUpdate(engine, delta) {
        if (!this.visible) return;
        if (this.pos.y < -20) {
            this.despawn(engine, "left");
        }
    }

    hitSomething(event) {
        if (event.other instanceof Player) {
            this.despawn(this.scene?.engine, "collected");
        }
    }

    despawn(engine, reason = "unknown") {
        const currentScene = this.scene;
        this.kill();

        console.log(`Oxygen bubble ${reason}! Respawning in 3 seconds...`);

        const timer = new Timer({
            fcn: () => {
                console.log("Oxygen bubble respawned!");
                this.respawn();
                if (currentScene) currentScene.add(this);
            },
            repeats: false,
            interval: 15000
        });

        if (engine) {
            engine.add(timer);
            timer.start();
        }
    }
}