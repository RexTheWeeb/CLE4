import { Color, Scene, Vector, DisplayMode, SolverStrategy, Keys, Actor } from "excalibur"
import { Resources } from './resources'
import { SupplyBackground } from "./ship_background"
import { ReturnTeleport } from "./return_from_ship.js"
import { Player } from "./player.js"
import { PlayerGrounded } from "./player_grounded.js"
import { Floor } from "./floor.js"
import { DisplayCase } from "./display_case.js"
import { UpgradeCase } from "./upgrade_case.js"
import { CatVendor } from "./cat_vendor.js"
import { Item } from "./item.js"
import { Shipteleport } from "./ship_teleport.js"

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

        const returnTeleport = new Shipteleport(new Vector(100, 600), Color.Green, 'root')
        this.add(returnTeleport)

        const floor = new Floor(new Vector(640, 700), 1280, 100)
        this.add(floor)

        const wallRight = new Floor(new Vector(0, 200), 100, 1280)
        this.add(wallRight)

        const wallLeft = new Floor (new Vector(1280, 200), 100, 1280)
        this.add(wallLeft)

        const screen = new Item (new Vector(650, 400), Resources.Screen.toSprite())
        screen.scale = new Vector(1.5, 1.5)
        this.add(screen)

        const painting1 = new Item (new Vector(200, 400), Resources.PaintingShark.toSprite())
        this.add(painting1)

        const painting2 = new Item (new Vector(1100, 400), Resources.PaintingFish.toSprite())
        this.add(painting2)
        // left out new item cuz it let the game crasg // Chaim

        //Display cases
        const displayCaseAmulet = new DisplayCase(new Vector(300, 625), this.amulet, Resources.DisplayAmulet.toSprite())
        this.add(displayCaseAmulet)

        const displayCaseMask = new DisplayCase(new Vector(640, 625), this.amulet, Resources.DisplayMask.toSprite())
        this.add(displayCaseMask)

        const upgrade_case = new UpgradeCase(new Vector(840, 590))
        this.add(upgrade_case)

        const catsuit = new CatVendor(new Vector(775, 620))
        this.add(catsuit)

        
        //camera settings
        const cameraTarget = new Actor()
        cameraTarget.pos = new Vector(player.pos.x, 350)
        this.add(cameraTarget)
        this.camera.strategy.lockToActor(cameraTarget)

        this.player = player
        this.cameraTarget = cameraTarget
        this.player2 = player2
    }

onPostUpdate() {
    // Calculate midpoint between players
    let posX = (this.player.pos.x + this.player2.pos.x) / 2

    // Define camera limits (adjust these to match your level size and wall positions)
    const minX = 640 
    // left edge (half viewport width)
    const maxX = 1280 - 640 
    // right edge (map width - half viewport width)

    // Clamp the camera X position so it doesn't go past the walls
    posX = Math.max(minX, Math.min(maxX, posX))

    // Set camera target position
    this.cameraTarget.pos = new Vector(posX, 350)
}
}