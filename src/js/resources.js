import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { Relic } from './relic'

// voeg hier jouw eigen resources toe
const Resources = {
   Treasure: new ImageSource('images/treasure_placeholder.webp'),
   DisplayEmpty: new ImageSource('images/DisplayCase.png'),
   DisplayAmulet: new ImageSource('images/DisplayCaseAmulet.png'),
   DisplayMask: new ImageSource('images/DisplayCaseMask.png'),
   DisplayStatue: new ImageSource('images/DisplayCaseStatue.png'),
   Screen: new ImageSource('images/Window.png'),
   Background: new ImageSource('images/ocean_background_temp.jpg'),
   oxygenTank: new ImageSource('images/oxygenTank.png'),
   up1: new ImageSource('images/up1.png'),     
   SpeedUpgrade: new ImageSource('images/speed_upgrade.png'),

   
   SupplyBackground: new ImageSource('images/supplyship_background.jpg'),
   Bubbles: new ImageSource('images/bubble.webp'),
   Diver1: new ImageSource('images/diver1.png'),
   Diver2: new ImageSource('images/diver2.png'),
   Catsuit: new ImageSource('images/catsuit.png'),

   // Relic sprites.

   RelicAmulet: new ImageSource('images/amulet.png'),
   RelicMask: new ImageSource('images/Mask.png'),
   RelicStatue: new ImageSource('images/statue.png'),

   //trash sprites
   Packet: new ImageSource('images/trash-sprites/drinkpacket-48x48.PNG'),
   Net: new ImageSource('images/trash-sprites/fishnet-64x64.PNG'),

   //paintings
   PaintingShark: new ImageSource('images/Painting_shark.png'),
    PaintingFish: new ImageSource('images/Painting_Fish.png'),


   // sound effecten 
   pickup2: new Sound('sounds/pickup2.mp3'),
   PutInTreasure: new Sound('sounds/put-in-treasure.mp3'),
   BackgroundMusic: new Sound('sounds/backgroundmusic.wav'),
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }