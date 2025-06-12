import '../css/style.css'
import * as ex from 'excalibur'
import * as tiled from '@excaliburjs/plugin-tiled'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { Treasure } from './treasure.js'
import testMapUrl from '/maps/testMap.tmx?url'

export class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.Fixed,
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
        //Voeg de map toe.
        this.tiledMap.addToScene(this.currentScene)
        const player = new Player(new Vector(100, 100))
        this.add(player)

        const treasure = new Treasure()
        this.add(treasure)
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
}

new Game()
