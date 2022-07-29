class MovableObject extends DrawableObject {
    speed = 0.015;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    accelerationBottle = 5;
    energy = 100;
    bossEnergy = 100;
    chickenEnergy = 5;
    lastHitChicken = 0;


    coin = 0;
    bottle = 0;

    lastHit = 0;
    takeBottle_sound = new Audio('audio/bottle.mp3');
    takeCoin_sound = new Audio('audio/coin.mp3');
    jump_sound = new Audio('audio/jump.mp3');

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);

    }

    applyGravityBottle() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelerationBottle;
            }
        }, 1000 / 25);

    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 380;
        } else {

            return this.y < 180;
        }
    }






    // character.isColliding(chicken);
    isColliding(mo) {





  /*     return this.x + this.width - this.offset.right > mo.x + mo.offsetleft &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
*/

       
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
            
    }

    isCollidingAtTop(mo) {
        /*
        return this.x + this.width > mo.x &&
        this.y + this.height >= mo.y +20 &&
        this.y + this.height <= mo.y +40 &&
        this.x < mo.x + mo.width;
*/

        
        return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x + this.width < (mo.x + mo.width) + 45 &&
        this.y + this.height < mo.y + mo.height;

    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
            var element = document.getElementById("theEndScreenLost");
            element.classList.remove("displayNone");
            element.classList.add('theEndScreenLost');

            var element = document.getElementById("canvas");
            element.classList.add("displayNone");
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    hitBoss() {
        this.bossEnergy -= 40;
        if (this.bossEnergy < 0) {
            this.bossEnergy = 0;

           // removeListener();


            setTimeout(() => {
                var element = document.getElementById("theEndScreen");
                element.classList.remove("displayNone");
                element.classList.add('theEndScreen');
    
                var element = document.getElementById("canvas");
                element.classList.add("displayNone");
            }, 5000);
            



          


        } else {
            this.lastHit = new Date().getTime();

        }




        console.log(this.bossEnergy);

    }

removeListener(){
            
    removeEventListener('keydown', (e) => {
        if(e.keyCode == 39){
            keyboard.RIGHT = true;
        }
        if(e.keyCode == 37){
            keyboard.LEFT = true;
        }
        if(e.keyCode == 38){
            keyboard.UP = true;
        }
        if(e.keyCode == 40){
            keyboard.DOWN = true;
        }
        if(e.keyCode == 32){
            keyboard.SPACE = true;
        }
        if(e.keyCode == 68){
            keyboard.D = true;
        }
    });

}





    hitChicken() {
        this.chickenEnergy -= 5;
        if (this.chickenEnergy < 0) {
            this.chickenEnergy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        console.log('chicken is dead');

    }


    takeCoin() {
        this.coin += 1;
        this.takeCoin_sound.play();
        if (this.coin > 10) {
            this.coin = 10;
        }

    }

    takeBottle() {
        this.bottle += 1;
        this.takeBottle_sound.play();
        if (this.bottle > 5) {
            this.bottle = 5;
        }


    }



    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //difference in ms
        timepassed = timepassed / 1000; //difference in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;


    }

    bossIsDead() {
        return this.bossEnergy == 0;

    }

    chickenIsDead() {
        return this.chickenEnergy == 0;
    }


    bossIsHurt() {

        let timepassed = new Date().getTime() - this.lastHit; //difference in ms
        timepassed = timepassed / 1000; //difference in s
        return timepassed < 1;
    }







    moveRight(params) {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 30;

    }


}