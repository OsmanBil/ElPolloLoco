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
    win_sound = new Audio('audio/win.mp3');
    lose_sound = new Audio('audio/lose.mp3');

    offsetleft = 0;
    offsetRight = 0;
    offsetTop = 0;
    offsetBottom = 0;

    //----To apply Gravity----
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

    //----If is above ground attributes for throwables/ Bottles and objects on ground----
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 380;
        } else {
            return this.y < 180;
        }
    }

    //character.isColliding(chicken);
    isColliding(mo) {
        return this.x + this.width - this.offsetRight > mo.x + this.offsetleft &&
            this.y + this.height - this.offsetBottom > mo.y + this.offsetTop &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    //----On top colliding attributes----
    isCollidingAtTop(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x + this.width < (mo.x + mo.width) + 45 &&
            this.y + this.height < mo.y + mo.height;
    }

    //----What happens, when character gets a hit----
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
            this.theEnd();
            this.theEndLoseScreenManager();
            world.character.gameEnd = true;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    //----What happens, when boss gets a hit----
    hitBoss() {
        this.bossEnergy -= 20;
        if (this.bossEnergy <= 0) {
            this.bossEnergy = 0;
            this.win_sound.play();
            this.theEndScreenManager();
            world.character.gameEnd = true;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    theEndLoseScreenManager() {
        var element = document.getElementById("theEndScreenLost");
        element.classList.remove("displayNone");
        element.classList.add('theEndScreenLost');
        var element = document.getElementById("canvas");
        element.classList.add("displayNone");
        var element = document.getElementById("reStartGameBtnLose")
        element.classList.remove("displayNone");
        element.classList.add('reStartGameBtnLose');
    }

    theEndScreenManager() {
        setTimeout(() => {
            var element = document.getElementById("theEndScreen");
            element.classList.remove("displayNone");
            element.classList.add('theEndScreen');
            var element = document.getElementById("canvas");
            element.classList.add("displayNone");
            var element = document.getElementById("reStartGameBtnWin")
            element.classList.remove("displayNone");
            element.classList.add('reStartGameBtnWin');
        }, 4000);
    }

    //----What happens, when chicken and miniChicken gets a hit----
    hitChicken() {
        this.chickenEnergy -= 5;
        if (this.chickenEnergy < 0) {
            this.chickenEnergy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    //----What happens, when character takes a coin----
    takeCoin() {
        this.coin += 1;
        this.takeCoin_sound.play();
        if (this.coin > 5) {
            this.coin = 5;
        }
    }

    //----What happens, when character takes a bottle----
    takeBottle() {
        if (world.character.bottle < 5) {
            this.bottle += 1;
            this.takeBottle_sound.play();
            if (this.bottle > 5) {
                this.bottle = 5;
            }
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

    loseSound() {
        this.lose_sound.play();
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

    //----Game over----
    theEnd() {
        world.spawnedChicks.splice(0, 1);
        world.level.chickens.splice(0, 1);
        this.loseSound();
    }
}