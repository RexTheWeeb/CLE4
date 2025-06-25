import { Vector, CollisionType, Actor, RotationType, vec} from "excalibur"
import { Resources } from "./resources"

//list of fish imports
import { Fish1 } from "./fishes/1_rainbow_fish"
import { Fish2 } from "./fishes/2_fish_name"
import { Fish3 } from "./fishes/3_fish_name"
import { Fish4 } from "./fishes/4_fish_name"
import { Fish5 } from "./fishes/5_fish_name"
import { Fish6 } from "./fishes/6_fish_name"
import { Fish7 } from "./fishes/7_fish_name"
import { Fish8 } from "./fishes/8_fish_name"
import { Fish9 } from "./fishes/9_fish_name"
import { Fish10 } from "./fishes/10_fish_name"
import { Fish11 } from "./fishes/11_fish_name"
import { Fish12 } from "./fishes/12_fish_name"
import { Fish13 } from "./fishes/13_fish_name"
import { Fish14 } from "./fishes/14_fish_name"
import { Fish15 } from "./fishes/15_fish_name"
import { Fish16 } from "./fishes/16_fish_name"
import { Fish17 } from "./fishes/17_fish_name"
import { Fish18 } from "./fishes/18_fish_name"
import { Fish19 } from "./fishes/19_fish_name"
import { Fish20 } from "./fishes/20_fish_name"
import { Fish21 } from "./fishes/21_fish_name"
import { Fish22 } from "./fishes/22_fish_name"
import { Fish23 } from "./fishes/23_fish_name"
import { Fish24 } from "./fishes/24_fish_name"
import { Fish25 } from "./fishes/25_fish_name"
import { Fish26 } from "./fishes/26_fish_name"
import { Fish27 } from "./fishes/27_fish_name"
import { Fish28 } from "./fishes/28_fish_name"


export class Fish extends Actor {

    #fishId 
    #rarity
    #color
    #description 
    sprite 
    chosenFish
    loopFish
    name
    #gamePlaying

    startingxPos;
    startingyPos;

    constructor(position, xpos, ypos) {
        super({
            collisionType: CollisionType.Active,
        })
        //position is set depending on where the trash was
        this.pos = position
        // this.actions.rotateTo(Math.PI / 4, Math.PI, RotationType.Clockwise) //this is to make the fish look forward
        this.body.useGravity = false;

        this.startingxPos = xpos;
        this.startingyPos = ypos;

        this.#gamePlaying = true;
    }

    onInitialize(){
        const calc = Math.floor(Math.random() * 27 + 1)
        this.chosenFish = `Fish${calc}`    
        this.#fishId = calc;
        this.#getInfo();
        this.#roam();
        this.on("collisionstart", (event) => this.hitSomething(event))

    }

        hitSomething(event) {
        // Check if the fish hit a wall (for example, Pillar)
        if (event.other.owner && event.other.owner.name === "level1") {
            this.graphics.flipHorizontal = !this.graphics.flipHorizontal
            this.vel = new Vector(-this.vel.x, this.vel.y)
        }
    }
   
    #roam(){
        let randomx1 = Math.floor(Math.random() * 500 - Math.floor(Math.random() * 500));
        let randomx2 = Math.floor(Math.random() * 500 - Math.floor(Math.random() * 500));
        let randomx3 = Math.floor(Math.random() * 500 - Math.floor(Math.random() * 500));

        let randomy1 = Math.floor(Math.random() * 300 - Math.floor(Math.random() * 300));
        let randomy2 = Math.floor(Math.random() * 300 - Math.floor(Math.random() * 300));
        let randomy3 = Math.floor(Math.random() * 300 - Math.floor(Math.random() * 300));

        let randomDelay = Math.floor(Math.random() * 3000);

        let movementspeed;


        //x and y positions need to be random
        //flipping sprite doesn't work yet
        //start point + or - random vector
        setTimeout(()=>{
            for(let i = 0; i < 40; i++){
            movementspeed =  Math.floor(Math.random() * 40 + 20)
            if(randomx1 > this.startingxPos){
                // console.log(`right: ${randomx1} vs ${this.startingxPos}`)
                this.graphics.flipHorizontal = false;
            } else if (randomx1 < this.startingxPos){
                // console.log(`left ${randomx1} vs ${this.startingxPos}`)
                this.graphics.flipHorizontal = true;
            }
            this.actions
            .moveTo(new Vector(randomx1, randomy1), movementspeed)
            .delay(randomDelay)

            randomDelay = Math.floor(Math.random() * 3000);

            movementspeed =  Math.floor(Math.random() * 40 + 20)
            if(randomx2 > randomx1){
                // console.log(`right ${randomx2} vs ${randomx1}`)
                this.graphics.flipHorizontal = false;
            } else if (randomx2 < randomx1){
                // console.log(`left ${randomx2} vs ${randomx1}`)
                this.graphics.flipHorizontal = true;
            }
            this.actions
            .moveTo(new Vector(randomx2, randomy2), movementspeed)
            .delay(randomDelay)

            randomDelay = Math.floor(Math.random() * 3000);

            movementspeed =  Math.floor(Math.random() * 40 + 20)
            if(randomx3 > randomx2){
                // console.log(`right ${randomx3} vs ${randomx2}`)
                this.graphics.flipHorizontal = false;
            } else if (randomx3 < randomx2){
                // console.log(`left ${randomx3} vs ${randomx2}`)
                this.graphics.flipHorizontal = true;
            }
            this.actions
            .moveTo(new Vector(randomx3, randomy3), movementspeed)
            .delay(randomDelay)

            randomx1 = Math.floor(Math.random() * 400 + 50);
            randomx2 = Math.floor(Math.random() * 400 + 50);
            randomx3 = Math.floor(Math.random() * 400 + 50);

            randomy1 = Math.floor(Math.random() * 400 + 50);
            randomy2 = Math.floor(Math.random() * 400 + 50);
            randomy3 = Math.floor(Math.random() * 400 + 50);
            }
        }, 1000)
    }

    #getInfo(){
        switch(this.#fishId){ //sadly need a for loop or switch case to properly get this

            case 1:
            this.graphics.use(Resources.Fish1.toSprite());
            this.loopFish = new Fish1();
            break;
            case 2:
            this.graphics.use(Resources.Fish2.toSprite());
            this.loopFish = new Fish2();
            break;
            case 3:
            this.graphics.use(Resources.Fish3.toSprite());
            this.loopFish = new Fish3();
            break;
            case 4:
            this.graphics.use(Resources.Fish4.toSprite());
            this.loopFish = new Fish4();
            break;
            case 5:
            this.graphics.use(Resources.Fish5.toSprite());
            this.loopFish = new Fish5();
            break;
            case 6:
            this.graphics.use(Resources.Fish6.toSprite());
            this.loopFish = new Fish6();
            break;
            case 7:
            this.graphics.use(Resources.Fish7.toSprite());
            this.loopFish = new Fish7();
            break;
            case 8:
            this.graphics.use(Resources.Fish8.toSprite());
            this.loopFish = new Fish8();
            break;
            case 9:
            this.graphics.use(Resources.Fish9.toSprite());
            this.loopFish = new Fish9();
            break;
            case 10:
            this.graphics.use(Resources.Fish10.toSprite());
            this.loopFish = new Fish10();
            break;
            case 11:
            this.graphics.use(Resources.Fish11.toSprite());
            this.loopFish = new Fish11();
            break;
            case 12:
            this.graphics.use(Resources.Fish12.toSprite());
            this.loopFish = new Fish12();
            break;
            case 13:
            this.graphics.use(Resources.Fish13.toSprite());
            this.loopFish = new Fish13();
            break;
            case 14:
            this.graphics.use(Resources.Fish14.toSprite());
            this.loopFish = new Fish14();
            break;
            case 15:
            this.graphics.use(Resources.Fish15.toSprite());
            this.loopFish = new Fish15();
            break;
            case 16:
            this.graphics.use(Resources.Fish16.toSprite());
            this.loopFish = new Fish16();
            break;
            case 17:
            this.graphics.use(Resources.Fish17.toSprite());
            this.loopFish = new Fish17();
            break;
            case 18:
            this.graphics.use(Resources.Fish18.toSprite());
            this.loopFish = new Fish18();
            break;
            case 19:
            this.graphics.use(Resources.Fish19.toSprite());
            this.loopFish = new Fish19();
            break;
            case 20:
            this.graphics.use(Resources.Fish20.toSprite());
            this.loopFish = new Fish20();
            break;
            case 21:
            this.graphics.use(Resources.Fish21.toSprite());
            this.loopFish = new Fish21();
            break;
            case 22:
            this.graphics.use(Resources.Fish22.toSprite());
            this.loopFish = new Fish22();
            break;
            case 23:
            this.graphics.use(Resources.Fish23.toSprite());
            this.loopFish = new Fish23();
            break;
            case 24:
            this.graphics.use(Resources.Fish24.toSprite());
            this.loopFish = new Fish24();
            break;
            case 25:
            this.graphics.use(Resources.Fish25.toSprite());
            this.loopFish = new Fish25();
            break;
            case 26:
            this.graphics.use(Resources.Fish26.toSprite());
            this.loopFish = new Fish26();
            break;
            case 27:
            this.graphics.use(Resources.Fish27.toSprite());
            this.loopFish = new Fish27();
            break;
            case 28:
            this.graphics.use(Resources.Fish28.toSprite());
            this.loopFish = new Fish28();
            break;

        }

        this.#description = this.loopFish.getDescription();
        this.#color = this.loopFish.getColor();
        this.#rarity = this.loopFish.getRarity();
        this.name = this.loopFish.getName();


        console.log(this.#description);
        console.log(this.#color);
        console.log(this.#rarity);
        console.log(this.name);
    }
 
}