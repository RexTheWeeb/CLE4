import { Actor, Vector } from "excalibur"
import { Resources } from './resources'

export class Background extends Actor {
    onInitialize(engine) {
        const sprite = Resources.Background.toSprite()
        sprite.width = engine.drawWidth + 100
        sprite.height = engine.drawHeight + 100
        this.graphics.use(sprite)
        this.z = -100
        this.pos = new Vector(engine.drawWidth / 2, engine.drawHeight / 2)
    }

    onPreUpdate(engine) {
        const target = engine.currentScene.camera.pos
        // Handmatige lerp (lineare interpolatie, ik ben ook geen wiskundegenie)
        const lerp = (start, end, t) => start + (end - start) * t
        this.pos = new Vector(
            lerp(this.pos.x, target.x, 0.1),
            lerp(this.pos.y, target.y, 0.1)
        )
    }
}

    // Deze in game.js om background werkend te krijgen
    // this.currentScene.camera.strategy.lockToActor(player)

    //Backup code:

// import { Actor, Vector } from "excalibur"
// import { Resources } from './resources'

// De Background class zorgt voor een achtergrond die altijd het hele scherm vult
// export class Background extends Actor {
//     onInitialize(engine) {
//         // Maak de sprite iets groter dan het scherm zodat je geen randen ziet
//         const sprite = Resources.Background.toSprite()
//         sprite.width = engine.drawWidth + 100
//         sprite.height = engine.drawHeight + 100
//         this.graphics.use(sprite)
//         this.z = -100 // altijd achter alles
//         // Zet de achtergrond in het midden van het scherm
//         this.pos = new Vector(engine.drawWidth / 2, engine.drawHeight / 2)
//     }
//     onPreUpdate(engine) {
//         // Houd de achtergrond in het midden van de camera voor een vloeiend effect
//         this.pos = engine.currentScene.camera.pos.clone()
//     }
// }

