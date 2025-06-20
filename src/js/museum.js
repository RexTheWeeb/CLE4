import { Color, Scene, Vector, DisplayMode, SolverStrategy, Keys, Actor } from "excalibur"
import { Resources } from './resources'
import { SupplyBackground } from "./ship_background"
import { ReturnTeleport } from "./return_from_ship.js"
import { Player } from "./player.js"
import { PlayerGrounded } from "./player_grounded.js"
import { Floor } from "./floor.js"
import { DisplayCase } from "./display_case.js"

export class Museum extends Scene {
    player
    player2
    cameraTarget 
    amulet = true
    mask
    statue

    onInitialize(engine) {
        engine.backgroundColor = Color.LightGray

        const player = new PlayerGrounded(new Vector(200, 620), Keys.A, Keys.D, Resources.Diver1.toSprite())
        this.add(player)

        const player2 = new PlayerGrounded(new Vector(250, 620), Keys.Left, Keys.Right, Resources.Diver2.toSprite())
        this.add(player2)

        // Add the return teleport area
        const returnTeleport = new Shipteleport(new Vector(100, 600), Color.Green, 'root')
        this.add(returnTeleport)

        const floor = new Floor(new Vector(640, 700), 1280, 100)
        this.add(floor)

        const wallRight = new Floor(new Vector(0, 200), 100, 1280)
        this.add(wallRight)

        const wallLeft = new Floor (new Vector(1280, 200), 100, 1280)
        this.add(wallLeft)

        const screen = new Item (new Vector(650, 400), Resources.Screen.toSprite())
        this.add(screen)

        //Display cases
        const display_case_amulet = new DisplayCase(new Vector(300, 625), this.amulet, Resources.DisplayAmulet.toSprite())
        this.add(display_case_amulet)

        const display_case_mask = new DisplayCase(new Vector(640, 625), this.amulet, Resources.DisplayMask.toSprite())
        this.add(display_case_mask)

        this.camera.strategy.lockToActor(player)
    }
}