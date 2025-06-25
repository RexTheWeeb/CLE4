import { Actor, Vector } from "excalibur"
import { Resources } from './resources'

export class Background extends Actor {
    onInitialize(engine) {
        const sprite = Resources.Background.toSprite()
        sprite.width = engine.drawWidth + 550
        sprite.height = engine.drawHeight + 550
        this.graphics.use(sprite)
        this.z = -100
        this.pos = new Vector(engine.drawWidth / 2, engine.drawHeight / 2)
    }

    onPreUpdate(engine) {
        const target = engine.currentScene.camera.pos
        // Manually lerp (lineare interpolatie)
        const lerp = (start, end, t) => start + (end - start) * t
        this.pos = new Vector(
            lerp(this.pos.x, target.x, 0.1),
            lerp(this.pos.y, target.y, 0.1)
        )
    }
}

    // Use this code to make the background work in the game.js
    // this.currentScene.camera.strategy.lockToActor(player)

    //Backup code:

// import { Actor, Vector } from "excalibur"
// import { Resources } from './resources'

//The background class makes sure the background is always fully filled
// export class Background extends Actor {
//     onInitialize(engine) {
//         // Make the sprite a little bit bigger than the screen so no edges can be seen
//         const sprite = Resources.Background.toSprite()
//         sprite.width = engine.drawWidth + 100
//         sprite.height = engine.drawHeight + 100
//         this.graphics.use(sprite)
//         this.z = -100 // altijd achter alles
//         // Place the background behind the scene
//         this.pos = new Vector(engine.drawWidth / 2, engine.drawHeight / 2)
//     }
//     onPreUpdate(engine) {
//         // Keep the background in the middle in the of the scene
//         this.pos = engine.currentScene.camera.pos.clone()
//     }
// }

