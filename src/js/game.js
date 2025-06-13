import '../css/style.css'
import * as ex from 'excalibur'
import * as tiled from '@excaliburjs/plugin-tiled'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { Player2 } from './player2.js'
import { Treasure } from './treasure.js'
import { Pickup } from './pickup.js'
import  testMapUrl from '/maps/testMap.tmx?url'
import { CollectionArea } from './collectionArea.js'
import { Background } from './background.js'
import { UI } from './ui.js'

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
                    solver: SolverStrategy.Arcade,
                    gravity: new Vector(0, 400),
                }
         })
         
         
         //Render de level en voeg het toe aan de game.
        this.tiledMap = new tiled.TiledResource(testMapUrl)
        ResourceLoader.addResource(this.tiledMap)

         // Zet minimum gamepad configuratie direct na engine aanmaken
         // Plaats deze regel pas NA this.start(), want gamepads zijn pas beschikbaar na engine start
         this.start(ResourceLoader).then(() => {
            // Probeer eerst minimum gamepad config te zetten
            try {
                this.input.gamepads.setMinimumGamepadConfiguration({
                    axis: 2,
                    buttons: 6,
                });
            } catch (e) {
                console.warn('Kon minimum gamepad config niet zetten:', e);
            }
            this.startGame();
         });
    }

    startGame() {
        //Voeg achtergrond toe
        const background = new Background()
        this.add(background)

        //Voeg de map toe.
        this.tiledMap.addToScene(this.currentScene)
        const player = new Player(new Vector(100, 100))
        this.add(player)

        const player2 = new Player2(new Vector(200, 200))
        this.add(player2)

        //created an empty cameratarget actor, empty since it only has to be between 
        // player one and two to lock the camera onto
        const cameraTarget = new Actor()
        cameraTarget.pos = player.pos.clone()
        this.add(cameraTarget)
        this.currentScene.camera.strategy.lockToActor(cameraTarget);

        for (let i = 0; i < 10; i++){
        const pickup = new Pickup
        this.add(pickup)
    }
        const collectionArea = new CollectionArea(new Vector(500, 100))
        this.add(collectionArea)

        this.player1 = player
        this.player2 = player2
        this.cameraTarget = cameraTarget

         // this.currentScene.camera.strategy.lockToActor(player)
        this.ui = new UI(player, player2)
        this.add(this.ui)
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
        // Geeft [x, y] terug van de eerste beschikbare gamepad (Excalibur of browser API)
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
