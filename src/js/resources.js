import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
   PlayerSprite: new ImageSource('images/CLE4-PlayerModel.png'),
   Treasure: new ImageSource('images/treasure_placeholder.webp'),
   Player2Sprite: new ImageSource('images/player2.png'),
   // sounnd effecten 
   PickupSound: new Sound('sounds/pickup.mp3'),
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }