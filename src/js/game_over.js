import { Scene, Label, Vector, Font, Color } from "excalibur"
import { ResetLevel } from './reset_level.js'

export class GameOver extends Scene {
    onActivate(ctx) {
        // Remove all actors from the scene
        this.actors.forEach(actor => actor.kill())
        this.showGameOverLabel()
        this.resetAndReturn(ctx.engine)
    }

    showGameOverLabel() {
        const label = new Label({
            text: "Game Over",
            pos: new Vector(500, 350),
            font: new Font({
                family: 'Arial',
                size: 48,
                color: Color.Red
            })
        })
        this.add(label)
    }

    resetAndReturn(engine) {
        setTimeout(() => {
            // Reset all game state and upgrades
            ResetLevel.resetAll(engine)
            if (engine.scenes && engine.scenes.museum) {
                ResetLevel.resetMuseumUpgrades(engine.scenes.museum)
            }
            engine.goToScene('root')
        }, 5000)
    }
}