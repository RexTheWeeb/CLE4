import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { Relic } from './relic'

// voeg hier jouw eigen resources toe
const Resources = {
   Treasure: new ImageSource('images/Treasure.png'),
   DisplayEmpty: new ImageSource('images/DisplayCase.png'),
   DisplayAmulet: new ImageSource('images/DisplayCaseAmulet.png'),
   DisplayMask: new ImageSource('images/DisplayCaseMask.png'),
   DisplayStatue: new ImageSource('images/DisplayCaseStatue.png'),
   Screen: new ImageSource('images/Window.png'),
   Background: new ImageSource('images/ocean_background_temp.jpg'),
   oxygenTank: new ImageSource('images/oxygenTank.png'),
   up1: new ImageSource('images/up1.png'),     

   
   Bubbles: new ImageSource('images/bubble.webp'),
   Diver1: new ImageSource('images/diver1.png'),
   Diver2: new ImageSource('images/diver2.png'),
   Catsuit: new ImageSource('images/catsuit.png'),
   Anchor: new ImageSource('images/Anchor.png'),
   Cage: new ImageSource('images/Cage.png'),
   Gate: new ImageSource('images/Gate.png'),

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
   Pillar: new ImageSource('images/pillar.png'),
    Door: new ImageSource('images/door.png'),



   // sound effecten 
   BackgroundMusic: new Sound('sounds/backgroundmusic.wav'),
   trashputinsound: new Sound('sounds/trashputinsound.mp3'),
   trashpickup: new Sound('sounds/pickuptrash.mp3'),
   pickup2: new Sound('sounds/pickup2.mp3'),
   PutInTreasure: new Sound('sounds/put-in-treasure.mp3'),
   relicsound: new Sound('sounds/relicsound.mp3'),
   bubblerefill: new Sound('sounds/bubblerefil.mp3'),
  

   //fish sprites
   Fish1: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_73_xx.png'),
   Fish2: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_04_xx.png'),
   Fish3: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_08_xx.png'),
   Fish4: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_13_xx.png'),
   Fish5: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_20_xx.png'),
   Fish6: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_27_xx.png'),
   Fish7: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_30_xx.png'),
   Fish8: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_47_xx.png'),
   Fish9: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_48_xx.png'),
   Fish10: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_53_xx.png'),
   Fish11: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_67_xx.png'),
   Fish12: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_82_xx.png'),
   Fish13: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_85_xx.png'),
   Fish14: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_90_xx.png'),
   Fish15: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_93_xx.png'),
   Fish16: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_102_xx.png'),
   Fish17: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_109_xx.png'),
   Fish18: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_125_xx.png'),
   Fish19: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_135_xx.png'),
   Fish20: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_140_xx.png'),
   Fish21: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_143_xx.png'),
   Fish22: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_149_xx.png'),
   Fish23: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_154_xx.png'),
   Fish24: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_160_xx.png'),
   Fish25: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_164_xx.png'),
   Fish26: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_170_xx.png'),
   Fish27: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_171_xx.png'),
   Fish28: new ImageSource('images/Beowulf_Fishes_Assets_Pack_size_64x64/spr_fish_01_xx.png'),
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }