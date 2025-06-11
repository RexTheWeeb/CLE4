import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
   PlayerSprite: new ImageSource('images/CLE4-PlayerModel.png'),
   Treasure: new ImageSource('images/treasure_placeholder.webp'),
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }