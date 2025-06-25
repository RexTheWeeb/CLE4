import { Scene, Vector } from "excalibur"
import { Resources } from './resources'
import { ReturnTeleport } from "./return_from_ship.js"
import { Player } from "./player.js"

export class Supplyship extends Scene {
    onInitialize(engine) {
        // Add the player at a starting position
        const player = new Player(new Vector(200, 200))
        this.add(player)

        // Add the return teleport area
        const returnTeleport = new ReturnTeleport(new Vector(600, 360))
        this.add(returnTeleport)
    }
}