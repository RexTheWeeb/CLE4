import { Scene, Vector } from "excalibur"
import { Resources } from './resources'
import { SupplyBackground } from "./ship_background"
import { ReturnTeleport } from "./return_from_ship.js"
import { Player } from "./player.js"
import { Player2 } from "./player2.js"
import { SpeedUpgrade } from "./speed_upgrade.js"

export class Supplyship extends Scene {
    onInitialize(engine) {
        const background = new SupplyBackground()
        this.add(background)

        // Add both players at starting positions
        const player = new Player(new Vector(200, 200))
        this.add(player)
        const player2 = new Player2(new Vector(300, 200))
        this.add(player2)

        // Add the return teleport area
        const returnTeleport = new ReturnTeleport(new Vector(600, 360))
        this.add(returnTeleport)

        const speedUpgrade = new SpeedUpgrade()
        this.add(speedUpgrade)
    }
}