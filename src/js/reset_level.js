import { Vector } from "excalibur"
import { Pickup, treasureSpawnArray, trashSpawnArray } from './pickup.js'
import { Relic } from './relic.js'
import { Bubble } from './oxygen_bubble.js'
import { Resources } from './resources.js'
import { OxygenUpgrade } from './oxygen_upgrade.js'
import { SpeedUpgrade } from './speed_upgrade.js'
import { Trash } from './trash.js'

export class ResetLevel {
    static resetAll(engine) {
        // Remove all actors from the scene
        engine.currentScene.actors.forEach(actor => actor.kill())

        // Reset player 1 state
        if (engine.player1) {
            if (engine.player1.treasure) {
                engine.player1.treasure.kill()
                engine.player1.treasure = null
            }
            if (engine.player1.trash) {
                engine.player1.trash.kill()
                engine.player1.trash = null
            }
            engine.player1.score = 0
            engine.player1.pos = new Vector(100, 200)
            engine.player1.vel = new Vector(0, 0)
            engine.player1.pickupState = false
            engine.player1.pickupItemType = null
            engine.player1.speed = 300
            engine.player1.objectSpeed = 150
            engine.player1.oxygenBarLength = 100 
        }

        // Reset player 2 state
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
            engine.player2.speed = 250
            engine.player2.objectSpeed = 200
            engine.player2.oxygenBarLength = 100 
        }

        // Reset UI
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

        // Reset camera position
        if (engine.player1 && engine.player2 && engine.cameraTarget) {
            const midX = (engine.player1.pos.x + engine.player2.pos.x) / 2
            const midY = (engine.player1.pos.y + engine.player2.pos.y) / 2
            engine.cameraTarget.pos.x = Math.round(midX)
            engine.cameraTarget.pos.y = Math.round(midY)
        }

        // Always respawn players left of the TrashNet
        const trashNet = engine.currentScene.actors.find(actor => actor instanceof TrashNet)
        let player1Spawn = new Vector(200, 100)
        let player2Spawn = new Vector(250, 100)
        if (trashNet) {
            player1Spawn = new Vector(trashNet.pos.x - 100, trashNet.pos.y)
            player2Spawn = new Vector(trashNet.pos.x - 50, trashNet.pos.y)
        }
        if (engine.player1) engine.player1.pos = player1Spawn
        if (engine.player2) engine.player2.pos = player2Spawn

        // Reset pickups and objects
        treasureSpawnArray.splice(0, treasureSpawnArray.length, 
            new Vector(1376, 1136), new Vector(512, 1200), new Vector(768, 1808),
            new Vector(832, 4016), new Vector(1552, 2400), new Vector(1568, 1424),
            new Vector(224, 2784), new Vector(112, 2256), new Vector(368, 3568),
            new Vector(1248, 3936), new Vector(1312, 4576)
        )
        trashSpawnArray.splice(0, trashSpawnArray.length, 
            new Vector(1370, 1136), new Vector(508, 1200), new Vector(760, 1808),
            new Vector(825, 4016), new Vector(1544, 2400), new Vector(1560, 1424),
            new Vector(220, 2784), new Vector(106, 2256), new Vector(361, 3568),
            new Vector(1240, 3936), new Vector(1305, 4576)
        )

        for (let i = 0; i < treasureSpawnArray.length; i++) {
            const pickup = new Pickup(Resources.Treasure.toSprite(), 0)
            engine.add(pickup)
        }
        for (let i = 0; i < trashSpawnArray.length; i++) {
            const pickup = new Pickup(Resources.Packet.toSprite(), 1)
            engine.add(pickup)
        }

        // Re-add relics
        const relic1 = new Relic(new Vector(192, 2064), Resources.RelicAmulet.toSprite(), 'amulet')
        const relic2 = new Relic(new Vector(192, 4224), Resources.RelicMask.toSprite(), 'mask')
        const relic3 = new Relic(new Vector(1168, 5344), Resources.RelicStatue.toSprite(), 'statue')
        engine.add(relic1)
        engine.add(relic2)
        engine.add(relic3)

        // Re-add bubbles
        engine.bubbles = new Bubble()
        engine.add(engine.bubbles)
    }

    static resetMuseumUpgrades(museumScene) {
        museumScene.actors.forEach(actor => {
            if (actor instanceof OxygenUpgrade || actor instanceof SpeedUpgrade) {
                actor.kill()
            }
        })
        const oxygenUpgrade = new OxygenUpgrade(new Vector(840, 590))
        museumScene.add(oxygenUpgrade)
        const speedUpgrade = new SpeedUpgrade(new Vector(940, 590))
        museumScene.add(speedUpgrade)
    }
}