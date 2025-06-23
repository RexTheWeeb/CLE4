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
import { SpeedUpgrade } from "./speed_upgrade.js"

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
        player.score = 2;
        this.add(player)

        const player2 = new PlayerGrounded(new Vector(250, 620), Keys.Left, Keys.Right, Resources.Diver2.toSprite())
        player.score = 2;
        this.add(player2)

        const returnTeleport = new  Shipteleport(new Vector(100, 600), Color.Green, 'root')
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
        // left out new item cuz it let the game crasg // Chaim

        //Display cases
        const displayCaseAmulet = new DisplayCase(new Vector(300, 625), this.amulet, Resources.DisplayAmulet.toSprite())
        this.add(displayCaseAmulet)

        const displayCaseMask = new DisplayCase(new Vector(640, 625), this.amulet, Resources.DisplayMask.toSprite())
        this.add(displayCaseMask)

        const upgradeCase = new UpgradeCase(new Vector(840, 590))
        this.add(upgradeCase)

        const speedUpgrade = new SpeedUpgrade(new Vector(940, 590))
        this.add(speedUpgrade)

        const catsuit = new CatVendor(new Vector(775, 620))
        this.add(catsuit)

        
        this.camera.strategy.lockToActor(player)
    }
}