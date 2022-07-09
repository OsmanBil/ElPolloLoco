class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    throwableObjects = [];



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {

            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionWithCoin();
            this.checkCollisionWithBottle();
            this.checkCollisionBottleWithChicken();


        }, 200);
    }


    checkThrowObjects() {
        if (this.keyboard.D) {

            if (this.character.bottle >= 1) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
                this.throwableObjects.push(bottle);
                this.character.bottle -= 1;
                this.bottleBar.setPercentageBottle(this.character.bottle);
                //        console.log('Collission with Character, bottle ', this.character.bottle);
            }

        }

    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                //       console.log('Collission with Character, energy ', this.character.energy);
            }
        });
    }

    checkCollisionWithCoin() {
        this.level.coin.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.takeCoin();
                this.coinBar.setPercentageCoin(this.character.coin);
                //  console.log('Collission with Character, coin ', this.character.coin);
                this.level.coin.splice(this.level.coin.indexOf(coin), 1);

            }
        });
    }



    checkCollisionWithBottle() {
        this.level.bottle.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.character.takeBottle();
                this.bottleBar.setPercentageBottle(this.character.bottle);
                //  console.log('Collission with Character, bottle ', this.character.bottle);
                this.level.bottle.splice(this.level.bottle.indexOf(bottle), 1);
            }

        });
    }


    /* 
    hitChicken(enemy){
        console.log('chicken is dead');
        this.chickenIsDead(enemy);
    }
    */


    chickenIsDead(enemy){
        /*
        let timepassed = new Date().getTime() - this.lastHit; //difference in ms
        timepassed = timepassed / 1000; //difference in s
        return timepassed < 1;
        */

        //this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
     
        setTimeout(() => {
            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
    
        }, 400);
    
    }


    checkCollisionBottleWithChicken() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach(bottle => {
                if (bottle.isColliding(enemy)) {
                    enemy.hitChicken();
                    this.chickenIsDead(enemy);
                }
            });



        });

    }






    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coin);

        this.addObjectsToMap(this.level.bottle);


        // Draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();

        });

        this.ctx.translate(-this.camera_x, 0);
        // ----Space for fixed objects ----
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);


    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }



    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}