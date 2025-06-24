import { Vector } from "excalibur"
import { Pickup, treasureSpawnArray, trashSpawnArray } from './pickup.js'
import { Relic } from './relic.js'
import { Bubble } from './oxygen_bubble.js'
import { Resources } from './resources.js'
import { OxygenUpgrade } from './oxygen_upgrade.js'
import { SpeedUpgrade } from './speed_upgrade.js'

export class ResetLevel {
    static resetPickupsAndObjects(game) {
        // Remove all pickups, relics, trash, and bubbles from the scene
        game.currentScene.actors.forEach(actor => {
            if (
                actor instanceof Pickup ||
                actor instanceof Relic ||
                actor.constructor.name === "Trash" ||
                actor instanceof Bubble
            ) {
                actor.kill()
            }
        });

        // Reset spawn arrays
        treasureSpawnArray.splice(0, treasureSpawnArray.length, 
            new Vector(1376, 1136), new Vector(512, 1200), new Vector(768, 1808),
            new Vector(832, 4016), new Vector(1552, 2400), new Vector(1568, 1424),
            new Vector(224, 2784), new Vector(112, 2256), new Vector(368, 3568),
            new Vector(1248, 3936), new Vector(1312, 4576)
        );
        trashSpawnArray.splice(0, trashSpawnArray.length, 
            new Vector(1370, 1136), new Vector(508, 1200), new Vector(760, 1808),
            new Vector(825, 4016), new Vector(1544, 2400), new Vector(1560, 1424),
            new Vector(220, 2784), new Vector(106, 2256), new Vector(361, 3568),
            new Vector(1240, 3936), new Vector(1305, 4576)
        );

        // Re-add pickups
        for (let i = 0; i < treasureSpawnArray.length; i++) {
            const pickup = new Pickup(Resources.Treasure.toSprite(), 0)
            game.add(pickup)
        }
        for (let i = 0; i < trashSpawnArray.length; i++) {
            const pickup = new Pickup(Resources.Packet.toSprite(), 1)
            game.add(pickup)
        }

        // Re-add relics
        const relic1 = new Relic(new Vector(192, 2064), Resources.RelicAmulet.toSprite(), 'amulet')
        const relic2 = new Relic(new Vector(192, 4224), Resources.RelicMask.toSprite(), 'mask')
        const relic3 = new Relic(new Vector(1168, 5344), Resources.RelicStatue.toSprite(), 'statue')
        game.add(relic1)
        game.add(relic2)
        game.add(relic3)

        // Re-add bubbles
        game.bubbles = new Bubble()
        game.add(game.bubbles)
    }

    static resetMuseumUpgrades(museumScene) {
        // Remove existing upgrades if present
        museumScene.actors.forEach(actor => {
            if (actor instanceof OxygenUpgrade || actor instanceof SpeedUpgrade) {
                actor.kill()
            }
        })
        // Add new upgrade items at their original positions
        const oxygenUpgrade = new OxygenUpgrade(new Vector(840, 590))
        museumScene.add(oxygenUpgrade)
        const speedUpgrade = new SpeedUpgrade(new Vector(940, 590))
        museumScene.add(speedUpgrade)
    }
}
