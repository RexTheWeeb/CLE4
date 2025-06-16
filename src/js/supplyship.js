import { Scene } from "excalibur"
import { Resources } from './resources'
import { SupplyBackground } from "./ship_background"

export class Supplyship extends Scene {
    onInitialize(engine) {
        const background = new SupplyBackground()
        this.add(background)

        

    }
}