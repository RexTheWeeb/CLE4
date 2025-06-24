import { Scene, Label, Vector, Font, Color } from "excalibur"
import { ResetLevel } from './reset_level.js'

export class GameOver extends Scene {
    onInitialize(engine) {
        this.showGameOverLabel()
        this.resetAndReturn(engine)
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
        this.resetPlayers(engine)
        this.resetUI(engine)
        this.resetCamera(engine)
        ResetLevel.resetPickupsAndObjects(engine)
        // Reset upgrades in the museum scene
        if (engine.scenes && engine.scenes.museum) {
            ResetLevel.resetMuseumUpgrades(engine.scenes.museum)
        }
        engine.goToScene('root')
    }, 5000)
}

    resetPlayers(engine) {
    if (engine.player1) {
        // Remove held treasure
        if (engine.player1.treasure) {
            engine.player1.treasure.kill()
            engine.player1.treasure = null
        }
        // Remove held trash
        if (engine.player1.trash) {
            engine.player1.trash.kill()
            engine.player1.trash = null
        }
        engine.player1.score = 0
        engine.player1.pos = new Vector(100, 200)
        engine.player1.vel = new Vector(0, 0)
        engine.player1.pickupState = false
        engine.player1.pickupItemType = null
        // Reset upgrades
        engine.player1.speed = 300
        engine.player1.objectSpeed = 150
        engine.player1.oxygenBarLength = 100 // or your default value
    }
    if (engine.player2) {
        if (engine.player2.treasure) {
            engine.player2.treasure.kill()
            engine.player2.treasure = null
        }
        if (engine.player2.trash) {
            engine.player2.trash.kill()
            engine.player2.trash = null
        }
        engine.player2.score = 0
        engine.player2.pos = new Vector(200, 200)
        engine.player2.vel = new Vector(0, 0)
        engine.player2.pickupState = false
        engine.player2.pickupItemType = null
        // Reset upgrades
        engine.player2.speed = 250
        engine.player2.objectSpeed = 200
        engine.player2.oxygenBarLength = 100 // or your default value
    }
}

   resetUI(engine) {
    if (engine.ui) {
        engine.ui.timerValue = 60
        engine.ui.maxTime = 60
        if (engine.ui.oxygenBar) {
            engine.ui.oxygenBar.maxValue = 60
            engine.ui.oxygenBar.setValue(60)
        }
        if (engine.ui.labelTimer) {
            engine.ui.labelTimer.text = `Oxygen: 60`
        }
        engine.ui.player1.score = 0
        engine.ui.player2.score = 0
        engine.ui.updateScore()
    }
}

    resetCamera(engine) {
        if (engine.player1 && engine.player2 && engine.cameraTarget) {
            const midX = (engine.player1.pos.x + engine.player2.pos.x) / 2;
            const midY = (engine.player1.pos.y + engine.player2.pos.y) / 2;
            engine.cameraTarget.pos.x = Math.round(midX);
            engine.cameraTarget.pos.y = Math.round(midY);
        }
    }
}