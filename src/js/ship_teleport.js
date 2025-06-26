import { Actor, Vector, Color, Keys } from "excalibur"
import { Resources } from './resources'
import { Player } from './player.js'
import { PlayerGrounded } from "./player_grounded.js"

export class Shipteleport extends Actor {
    sprite
    constructor(pos, sprite, scale, location) {
        super({
            pos: pos,
            width: sprite.width,
            height: sprite.height,        })
        this.location = location
        this.playerOverlapping = false
        this.sprite = sprite
        this.scale = scale
    }

    onInitialize(engine) {
        this.graphics.use(this.sprite).scale = this.scale
        this.engine = engine
        this.on("collisionstart", (event) => this.handleCollisionStart(event))
        this.on("collisionend", (event) => this.handleCollisionEnd(event))
    }

    handleCollisionStart(event) {
        if (event.other.owner instanceof Player || event.other.owner instanceof PlayerGrounded) {
            this.playerOverlapping = true
            this.engine.dialog.makeVisible()
        }
    }

    handleCollisionEnd(event) {
        if (event.other.owner instanceof Player || event.other.owner instanceof PlayerGrounded) {
            this.playerOverlapping = false
            this.engine.dialog.makeInvisible()

        }
    }

    onPreUpdate(engine) {
    // Check for keyboard E
    const ePressed = engine.input.keyboard.wasPressed(Keys.E)
    // Check for gamepad button 1 (B/Circle)
    const pad = engine.input.gamepads.at(0 || 1)
    const gamepadPressed = pad && pad.wasButtonPressed(0)

    if (this.playerOverlapping && (ePressed || gamepadPressed)) {
        // Store scores on the engine before switching scenes
        if (engine.player1 && engine.player2) {
            engine.player1Score = engine.player1.score
            engine.player2Score = engine.player2.score
        }
        this.scene.engine.goToScene(this.location)
    }
}

    leaveTeleport(event) {
        if (event.other.owner instanceof Player) {
            this.player1In = false
        }
        if (event.other.owner instanceof Player2) {
            this.player2In = false
        }
    }
}