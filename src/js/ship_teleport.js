import { Actor, Vector, Color, Keys } from "excalibur"
import { Resources } from './resources'
import { Player } from './player.js'
import { PlayerGrounded } from "./player_grounded.js"

export class Shipteleport extends Actor {
    sprite
    playersOverlapping = []
    constructor(pos, sprite, scale, location) {
        super({
            pos: pos,
            width: sprite.width,
            height: sprite.height,
        })
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
        for (const player of this.playersOverlapping) {
            let keyPressed = false
            let gamepadPressed = false
            if (player.gamepadIndex === 0) {
                keyPressed = engine.input.keyboard.wasPressed(Keys.E)
                const pad = engine.input.gamepads.at(0)
                gamepadPressed = pad && pad.wasButtonPressed(1)
            }
            if (player.gamepadIndex === 1) {
                keyPressed = engine.input.keyboard.wasPressed(Keys.O)
                const pad = engine.input.gamepads.at(1)
                gamepadPressed = pad && pad.wasButtonPressed(1)
            }
            if (keyPressed || gamepadPressed) {
                if (engine.player1 && engine.player2) {
                    engine.player1Score = engine.player1.score
                    engine.player2Score = engine.player2.score
                }
                engine.goToScene(this.location)
                break
            }
        }
    }
}