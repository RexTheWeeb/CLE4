import '../css/style.css'
import * as ex from 'excalibur'
import * as tiled from '@excaliburjs/plugin-tiled'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy, Label, Color } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { Pickup, treasureSpawnArray, trashSpawnArray } from './pickup.js'
import testMapUrl from '/maps/level1.tmx?url'
import { CollectionArea } from './collectionArea.js'
import { Background } from './background.js'
import { UI } from './ui.js'
import { Shipteleport } from './ship_teleport.js'
import { Bubble, bubbleSpawnArray } from './oxygen_bubble.js'
import { Museum } from './museum.js'
import { Trash } from './trash.js'
import { TrashNet } from './trashnet.js'
import { Relic } from './relic.js'
import { Fish } from './fish.js'
import { Dialog } from './dialog.js'
import { GameOver } from './game_over.js'
import { ResetLevel } from './reset_level.js'

export class Game extends Engine {
    player1
    player2
    cameraTarget
    ui
    sprite

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.Fixed,
            suppressPlayButton: true,
            physics: {
                solver: SolverStrategy.Arcade,
                gravity: new Vector(0, 10),
            }
        })

        this.add('museum', new Museum())
        this.add('gameover', new GameOver())
        this.tiledMap = new tiled.TiledResource(testMapUrl)
        ResourceLoader.addResource(this.tiledMap)

        this.start(ResourceLoader).then(() => {
            Resources.BackgroundMusic.loop = true
            Resources.BackgroundMusic.volume = 0.5
            try {
                this.input.gamepads.setMinimumGamepadConfiguration({
                    axis: 2,
                    buttons: 6,
                });
            } catch (e) {
                console.warn('Kon minimum gamepad config niet zetten:', e);
            }
            this.start(ResourceLoader).then(() => this.startGame())
        });
    }

    gameOver() {
        // Remove all actors from the scene
        this.currentScene.actors.forEach(actor => actor.kill())

        // Add a background for the Game Over screen
        const gameOverBackground = new Background()
        this.add(gameOverBackground)

        // Add the Game Over label
        const gameOverLabel = new Label({
            text: "GAME OVER",
            pos: new Vector(this.drawWidth / 2, this.drawHeight / 2),
            color: Color.Red,
            font: { size: 120, family: "Arial" },
            anchor: new Vector(0.5, 0.5)
        })
        this.add(gameOverLabel)

        // After 2 seconds, reset and restart the game
        setTimeout(() => {
            ResetLevel.resetAll(this)
            this.startGame()
        }, 2000)
    }

    startGame() {
        this.tiledMap.addToScene(this.currentScene)
        const background = new Background()
        this.add(background)

        //Voeg de map toe.
        const player = new Player(new Vector(100, 200), ex.Keys.W, ex.Keys.S, ex.Keys.A, ex.Keys.D, 0, Resources.Diver1.toSprite(), 300, 150 )
        this.add(player)
        const player2 = new Player(new Vector(200, 200), ex.Keys.Up, ex.Keys.Down, ex.Keys.Left, ex.Keys.Right, 1, Resources.Diver2.toSprite(), 250, 200)
        this.add(player2)

        // Assign to this.player1 and this.player2 before using them
        this.player1 = player
        this.player2 = player2

        // Camera target
        const cameraTarget = new Actor()
        cameraTarget.pos = player.pos.clone()
        this.add(cameraTarget)
        this.currentScene.camera.strategy.lockToActor(cameraTarget);

        // Spawn treasure
        for (let i = 0; i < treasureSpawnArray.length; i++) {
            const pickup = new Pickup(Resources.Treasure.toSprite(), 0)
            this.add(pickup)
        }

        // Spawn trash
        for (let i = 0; i < trashSpawnArray.length; i++) {
            const pickup = new Pickup(Resources.Packet.toSprite(), 1)
            this.add(pickup)
        }

        // Spawn Relics
        const relic1 = new Relic(new Vector(192, 2064), Resources.RelicAmulet.toSprite(), 2)
        const relic2 = new Relic(new Vector(192, 4224), Resources.RelicMask.toSprite(), 3)
        const relic3 = new Relic(new Vector(1168, 5344), Resources.RelicStatue.toSprite(), 4)
        this.add(relic1)
        this.add(relic2)
        this.add(relic3)

        // Museum teleport
        const museum_teleport = new Shipteleport(new Vector(1000, 550), Resources.Anchor.toSprite(), new Vector(2, 2), 'museum')
        // Pass scores to museum before switching scenes
        const museum = this.scenes.museum
        museum.enterWithScores(this.player1.score, this.player2.score)
        this.add(museum_teleport)

        // Collection area
        const collectionArea = new CollectionArea(new Vector(500, 100))
        this.add(collectionArea)

        // Trash net
        const net = new TrashNet(new Vector(300, 100))
        this.add(net)

        this.cameraTarget = cameraTarget

        this.spawnFish(new Vector(400, 300), 400, 300)

        this.ui = new UI(player, player2)
        this.add(this.ui)

        for (const spawnPoint of bubbleSpawnArray) {
            const bubble = new Bubble(spawnPoint);
            this.add(bubble);
        }
        // Play background music after everything is set up
        Resources.BackgroundMusic.loop = true
        Resources.BackgroundMusic.volume = 0.5
        Resources.BackgroundMusic.play()

        this.dialog = new Dialog('Do you want to enter the museum?')
        this.add(this.dialog)
    }

    onPostUpdate() {
        if (this.player1 && this.player2 && this.cameraTarget) {
            const midX = (this.player1.pos.x + this.player2.pos.x) / 2;
            const midY = (this.player1.pos.y + this.player2.pos.y) / 2;
            this.cameraTarget.pos.x = Math.round(midX);
            this.cameraTarget.pos.y = Math.round(midY);
        }
    }

    getGamepadAxes() {
        let x = 0, y = 0;
        let pad = this.input.gamepads.at(0);
        if (pad && pad.connected) {
            x = pad.getAxes(0) ?? 0;
            y = pad.getAxes(1) ?? 0;
        } else {
            const browserPads = navigator.getGamepads();
            if (browserPads && browserPads[0] && browserPads[0].connected) {
                x = browserPads[0].axes[0] ?? 0;
                y = browserPads[0].axes[1] ?? 0;
            }
        }
        return [x, y];
    }

    getCameraBounds() {
        const cam = this.currentScene.camera
        const width = this.drawWidth
        const height = this.drawHeight
        const left = cam.x - width / 2
        const right = cam.x + width / 2
        const top = cam.y - height / 2
        const bottom = cam.y + height / 2
        return { left, right, top, bottom }
    }

    spawnFish(pos) {
        const fish = new Fish(pos);
        this.add(fish);
    }

    goToGameOver() {
        this.goToScene('gameover')
    }
}

new Game()