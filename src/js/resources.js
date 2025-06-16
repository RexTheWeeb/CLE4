import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
   Treasure: new ImageSource('images/treasure_placeholder.webp'),
   Player2Sprite: new ImageSource('images/player2.png'),
   Background: new ImageSource('images/ocean_background_temp.jpg'),
   SupplyBackground: new ImageSource('images/supplyship_background.jpg'),
   Bubbles: new ImageSource('images/bubble.webp'),
   Diver1: new ImageSource('images/diver1.png'),
   Diver2: new ImageSource('images/diver2.png'),
   // sound effecten 
   
   pickup2: new Sound('sounds/pickup2.mp3'),
   PutInTreasure: new Sound('sounds/put-in-treasure.mp3'),
   BackgroundMusic: new Sound('sounds/BackgroundMusic.WAV'),
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }