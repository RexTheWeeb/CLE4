import { Color, Scene, Vector, Keys, Actor, Label, Font } from "excalibur"
import { Resources } from './resources'
import { ReturnTeleport } from "./return_from_ship.js"
import { Player } from "./player.js"
import { PlayerGrounded } from "./player_grounded.js"
import { Floor } from "./floor.js"
import { DisplayCase } from "./display_case.js"
import { OxygenUpgrade } from "./oxygen_upgrade.js"
import { CatVendor } from "./cat_vendor.js"
import { Item } from "./item.js"
import { Shipteleport } from "./ship_teleport.js"
import { Pillar } from "./pillar.js"
import { Dialog } from "./dialog.js"

export class Museum extends Scene {
    player
    player2
    cameraTarget 
    amulet = false
    mask = false
    statue = false
    labelP1
    labelP2

    setAmulet(){
        this.amulet = true
        this.refreshDisplayCases()
    }
    setMask(){
        this.mask = true
        this.refreshDisplayCases()
    }
    setStatue(){
        this.statue = true
        this.refreshDisplayCases()
    }

    refreshDisplayCases() {
        if (this.displayCaseAmulet) this.displayCaseAmulet.kill()
        if (this.displayCaseMask) this.displayCaseMask.kill()
        if (this.displayCaseStatue) this.displayCaseStatue.kill()

        this.displayCaseAmulet = new DisplayCase(new Vector(500, 625), this.amulet, Resources.DisplayAmulet.toSprite())
        this.add(this.displayCaseAmulet)

        this.displayCaseMask = new DisplayCase(new Vector(690, 625), this.mask, Resources.DisplayMask.toSprite())
        this.add(this.displayCaseMask)

        this.displayCaseStatue = new DisplayCase(new Vector(880, 625), this.statue, Resources.DisplayStatue.toSprite())
        this.add(this.displayCaseStatue)
    }

    onInitialize(engine) {
        engine.backgroundColor = Color.LightGray

        const player = new PlayerGrounded(new Vector(350, 620), Keys.A, Keys.D, Resources.Diver1.toSprite(), 0)
        this.add(player)

        const player2 = new PlayerGrounded(new Vector(400, 620), Keys.Left, Keys.Right, Resources.Diver2.toSprite(), 1)
        this.add(player2)

        // Set scores from engine if available
        if (typeof engine.player1Score === "number") {
            player.score = engine.player1Score
        }
        if (typeof engine.player2Score === "number") {
            player2.score = engine.player2Score
        }

        const returnTeleport = new Shipteleport(new Vector(200, 600), Resources.Door.toSprite(), new Vector(0.6, 0.6),'root')
        this.add(returnTeleport)

        const floor = new Floor(new Vector(640, 700), 1280, 100)
        this.add(floor)

        const wallRight = new Pillar(new Vector(0, 350), 100, 1280)
        this.add(wallRight)

        const wallLeft = new Pillar (new Vector(1280, 350), 100, 1280)
        this.add(wallLeft)

        const screen = new Item (new Vector(650, 400), Resources.Screen.toSprite())
        screen.scale = new Vector(1.5, 1.5)
        this.add(screen)

        const painting1 = new Item (new Vector(200, 400), Resources.PaintingShark.toSprite())
        this.add(painting1)

        const painting2 = new Item (new Vector(1100, 400), Resources.PaintingFish.toSprite())
        this.add(painting2)

        //Display cases
        const displayCaseAmulet = new DisplayCase(new Vector(500, 625), this.amulet, Resources.DisplayAmulet.toSprite())
        this.add(displayCaseAmulet)

        const displayCaseMask = new DisplayCase(new Vector(690, 625), this.mask, Resources.DisplayMask.toSprite())
        this.add(displayCaseMask)

        const displayCaseStatue = new DisplayCase(new Vector(880, 625), this.statue, Resources.DisplayStatue.toSprite())
        this.add(displayCaseStatue)

        const upgradeCase = new OxygenUpgrade(new Vector(1100, 590))
        this.add(upgradeCase)

        const catsuit = new CatVendor(new Vector(1030, 619))
        this.add(catsuit)
        
        //camera settings
        const cameraTarget = new Actor()
        cameraTarget.pos = new Vector(player.pos.x, 350)
        this.add(cameraTarget)
        this.camera.strategy.lockToActor(cameraTarget)

        this.player = player
        this.player2 = player2
        this.cameraTarget = cameraTarget

        // Add a score label for player 1
        this.labelP1 = new Label({
            text: `Score P1: ${this.player.score}`,
            pos: new Vector(100, 50),
            font: new Font({
                family: 'Arial',
                size: 24,
                color: Color.White
            }),
        })
        this.add(this.labelP1)

        // Add a score label for player 2
        this.labelP2 = new Label({
            text: `Score P2: ${this.player2.score}`,
            pos: new Vector(100, 100),
            font: new Font({
                family: 'Arial',
                size: 24,
                color: Color.White
            }),
        })
        this.add(this.labelP2)
    }

    onActivate(ctx) {
        const engine = ctx.engine
        if (this.player && typeof engine.player1Score === "number") {
            this.player.score = engine.player1Score
            if (this.labelP1) this.labelP1.text = `Score P1: ${this.player.score}`
        }
        if (this.player2 && typeof engine.player2Score === "number") {
            this.player2.score = engine.player2Score
            if (this.labelP2) this.labelP2.text = `Score P2: ${this.player2.score}`
        }
    }

    onPostUpdate() {
        // Calculate midpoint between players
        let posX = (this.player.pos.x + this.player2.pos.x) / 2

        // Clamp the camera X position so it doesn't go past the walls
        const minX = 640 
        const maxX = 1280 - 640 
        posX = Math.max(minX, Math.min(maxX, posX))

        // Set camera target position
        this.cameraTarget.pos = new Vector(posX, 350)

        if (this.labelP1 && this.player) {
            this.labelP1.text = `Score P1: ${this.player.score}`;
        }
        if (this.labelP2 && this.player2) {
            this.labelP2.text = `Score P2: ${this.player2.score}`;
        }
    }
}