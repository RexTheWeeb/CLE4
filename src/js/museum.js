import { Color, Scene, Vector, DisplayMode, SolverStrategy, Keys } from "excalibur"
import { Resources } from './resources'
import { SupplyBackground } from "./ship_background"
import { ReturnTeleport } from "./return_from_ship.js"
import { Player } from "./player.js"
import { PlayerGrounded } from "./player_grounded.js"
import { Floor } from "./floor.js"
import { DisplayCase } from "./display_case.js"
import { UpgradeCase } from "./upgrade_case.js"
import { CatVendor } from "./cat_vendor.js"



export class Museum extends Scene {

    onInitialize(engine) {
        engine.backgroundColor = Color.LightGray

        const player = new PlayerGrounded(new Vector(100, 620), Keys.A, Keys.D, Resources.Diver1.toSprite())
        this.add(player)

        const player2 = new PlayerGrounded(new Vector(100, 620), Keys.Left, Keys.Right, Resources.Diver2.toSprite())
        this.add(player2)

        // Add the return teleport area
        const returnTeleport = new ReturnTeleport(new Vector(600, 360))
        this.add(returnTeleport)

        const floor = new Floor(new Vector(640, 700), 1280, 100)
        this.add(floor)

        const wallRight = new Floor(new Vector(0, 200), 100, 1280)
        this.add(wallRight)

        const wallLeft = new Floor (new Vector(1280, 200), 100, 1280)
        this.add(wallLeft)

        const display_case = new DisplayCase(new Vector(640, 625))
        this.add(display_case)


        const upgrade_case = new UpgradeCase(new Vector(850, 570))
        this.add(upgrade_case)

        const cat_vendor = new CatVendor(new Vector(800, 620))
        this.add(cat_vendor)

        
        
        

        this.camera.strategy.lockToActor(player)
    }
}