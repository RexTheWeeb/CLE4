import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
   PlayerSprite: new ImageSource('images/CLE4-PlayerModel.png'),
   Treasure: new ImageSource('images/treasure_placeholder.webp'),
   Player2Sprite: new ImageSource('images/player2.png'),
   Background: new ImageSource('images/ocean_background_temp.jpg'),
   SupplyBackground: new ImageSource('images/supplyship_background.jpg'),
   // sounnd effecten 
   pickup2: new Sound('sounds/pickup2.mp3'),
    PutInTreasure: new Sound('sounds/put-in-treasure.mp3'),
   BackgroundMusic: new Sound('sounds/dreamyUnderwaterSound.mp3'),
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }