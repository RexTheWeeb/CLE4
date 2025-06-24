import { Vector, CollisionType, Actor, } from "excalibur"
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

    #fishId //generate
    #rarity //get from fish
    #color //get from fish
    #description //get from fish
    sprite //along with generation
    chosenFish //along generation
    loopFish
    name

    randomx
    randomy

    constructor(position) {
        super({
            collisionType: CollisionType.Active
            //make a set collision for all fish
        })
        //position is set depending on where the trash was
        this.pos = position
        console.log(position);
        //to prevent it form 'sinking' for the time being
        this.body.useGravity = false;
    }

    onInitialize(){
        //for testing will be Fish1 for a bit
        const calc = Math.floor(Math.random() * 27 + 1)
        this.chosenFish = `Fish${calc}`    
        this.#fishId = calc;
        this.#getInfo();
        this.#roam();
    }
   
    #roam(){
        //start point + or - random vector
        console.log("start roaming")

        if(this.randomx > 0){
            this.graphics.flipHorizontal = false;
        } else if (this.randomy < 0) {
            this.graphics.flipHorizontal = true;
        }
        /*  
        this.actions.moveBy(new Vector(-100, -100), 1000)
        this.actions.blink(200, 100, 5);
        */
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