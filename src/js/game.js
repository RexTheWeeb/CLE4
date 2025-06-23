import '../css/style.css'
import * as ex from 'excalibur'
import * as tiled from '@excaliburjs/plugin-tiled'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { Pickup } from './pickup.js'
import  testMapUrl from '/maps/level1.tmx?url'
import { CollectionArea } from './collectionArea.js'
import { Background } from './background.js'
import { UI } from './ui.js'
import { Supplyship } from './supplyship.js'
import { Shipteleport } from './ship_teleport.js'
import { Bubble } from './oxygen_bubble.js'
import { Museum } from './museum.js'
import {Trash} from './trash.js'

export class Game extends Engine {
    player1
    player2
    cameraTarget
    ui

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.Fixed,

                physics: {
                    solver: SolverStrategy.Realistic,
                    gravity: new Vector(0, 10),
                }
         })

         this.add('supplyship', new Supplyship())
         this.add('museum', new Museum())
         //Render the level and add it to the scene
        this.tiledMap = new tiled.TiledResource(testMapUrl)
        ResourceLoader.addResource(this.tiledMap)

         // Set the minimum gamepad configuration directly after making the engine
         // Place this rule after this.start(), the gamepad is only availible after engine start
         this.start(ResourceLoader).then(() => {
            // Prepare background music (do not play yet)
            Resources.BackgroundMusic.loop = true
            // adjust volume if needed
            Resources.BackgroundMusic.volume = 0.5
            // Probeer eerst minimum gamepad config te zetten
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

    startGame() {

        this.tiledMap.addToScene(this.currentScene)
        // Add a background
        const background = new Background()
        this.add(background)

        //Voeg de map toe.
        const player = new Player(new Vector(100, 200), ex.Keys.W, ex.Keys.S, ex.Keys.A, ex.Keys.D, 0, Resources.Diver1.toSprite(), 300, 150 )
        this.add(player)

        const player2 = new Player(new Vector(200, 200), ex.Keys.Up, ex.Keys.Down, ex.Keys.Left, ex.Keys.Right, 1, Resources.Diver2.toSprite(), 250, 200)
        this.add(player2)

        //created an empty cameratarget actor, empty since it only has to be between 
        // player one and two to lock the camera onto
        const cameraTarget = new Actor()
        cameraTarget.pos = player.pos.clone()
        this.add(cameraTarget)
        this.currentScene.camera.strategy.lockToActor(cameraTarget);

        const pickup = new Pickup
        this.add(pickup)

        //Star: trash testing, will get a different spot
        const trash = new Trash
        this.add(trash);

        const museum_teleport = new Shipteleport(new Vector(1000, 300), ex.Color.Purple, 'museum')
        this.add(museum_teleport)

        const collectionArea = new CollectionArea(new Vector(500, 100))
        this.add(collectionArea)

        this.player1 = player
        this.player2 = player2
        this.cameraTarget = cameraTarget

         // this.currentScene.camera.strategy.lockToActor(player)
        this.ui = new UI(player, player2)
        this.add(this.ui)

        this.bubbles = new Bubble()
        this.add(this.bubbles)
        console.log("Bubble spawned at", this.bubbles.pos.x.toFixed(0), this.bubbles.pos.y.toFixed(0))

        // Play background music after everything is set up
        Resources.BackgroundMusic.loop = true
        Resources.BackgroundMusic.volume = 0.5
        Resources.BackgroundMusic.play()
    }



    onPostUpdate() {
        if (this.player1 && this.player2 && this.cameraTarget){
            const midX = (this.player1.pos.x + this.player2.pos.x) / 2;
            const midY = (this.player1.pos.y + this.player2.pos.y) / 2;
            this.cameraTarget.pos.x = Math.round(midX);
            this.cameraTarget.pos.y = Math.round(midY);
        }
    }

    getGamepadAxes() {
        // Give X and Y back from the first availible gamepad (Excalibur or browser API)
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
}

new Game()
