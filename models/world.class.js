class World {

    character = new Character();
    boss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    bossBar = new BossBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    throwableObjects = [];
    throw_sound = new Audio('audio/throw.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    chickenDead_sound = new Audio('audio/chickenDead.mp3');

    ground = this.y < 380;



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 380;
        } else {

            return this.y < 180;
        }
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {

            this.checkCollisionsWithChickens();
            this.checkCollisionsWithBoss();
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
                this.throw_sound.play();
                //        console.log('Collission with Character, bottle ', this.character.bottle);
            }

        }

    }




    checkCollisionsWithBoss() {    
        
        this.level.boss.forEach((boss) => {
        this.throwableObjects.forEach(bottle => {
            if (bottle.isColliding(boss)) {
                this.boss.hitBoss();
                
                
               // this.statusBar.setPercentage(this.character.energy);
               // this.bossIsDead(boss);
               this.bossBar.setPercentage(this.boss.bossEnergy);
               
               setTimeout(() => {
                    this.throwableObjects.splice(0, 1);

                }, 100);
                
            } else if (!bottle.isAboveGround()) {
                this.throwableObjects.splice(0, 1);
            }
        });
    });

    }

    checkCollisionsWithChickens() {
        this.level.chickens.forEach((chicken) => {
            if (this.character.isColliding(chicken)) {
                this.character.hit();
                this.hurt_sound.play();
                this.statusBar.setPercentage(this.character.energy);

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



 


    chickenIsDead(chicken) {
        this.chickenDead_sound.play();
        setTimeout(() => {
            this.level.chickens.splice(this.level.chickens.indexOf(chicken), 1);
        }, 400);

    }


    checkCollisionBottleWithChicken() {
        this.level.chickens.forEach((chicken) => {
            this.throwableObjects.forEach(bottle => {
                if (bottle.isColliding(chicken)) {
                    chicken.hitChicken();
                    this.chickenIsDead(chicken);
                    setTimeout(() => {
                        this.throwableObjects.splice(0, 1)

                    }, 100);
                } else if (!bottle.isAboveGround()) {

                    this.throwableObjects.splice(0, 1)


                }
            });
        });
    }







    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);

        this.addObjectsToMap(this.level.chickens);
        this.addObjectsToMap(this.level.boss);

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
        this.addToMap(this.bossBar);
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