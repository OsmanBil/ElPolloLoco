class World {

    character = new Character();
    boss = new Endboss();
    miniChicken = new MiniChicken();
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
    miniChickenx = 500;
    spawnedChicks = [];



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
            this.checkCollisionsWithMiniChickens();
            this.checkCollisionBottleWithMiniChicken();



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
            }
        }
    }







    checkCollisionBottleWithMiniChicken() {
        this.spawnedChicks.forEach((miniChicken) => {
            this.throwableObjects.forEach(bottle => {
                if (bottle.isColliding(miniChicken)) {
                    miniChicken.hitChicken();
                    this.miniChickenIsDead(miniChicken);
                    setTimeout(() => {
                        this.throwableObjects.splice(0, 1)
                    }, 100);
                } else if (!bottle.isAboveGround()) {
                    this.throwableObjects.splice(0, 1)
                }
            });
        });
    }






    checkCollisionsWithMiniChickens() {
        this.spawnedChicks.forEach((miniChicken) => {


            if (this.character.isCollidingAtTop(miniChicken) && !this.character.y <= 180) {
                miniChicken.hitChicken();
                this.miniChickenIsDead(miniChicken);

            } else if (this.character.isColliding(miniChicken)) {
                this.character.hit();
                this.hurt_sound.play();
                this.statusBar.setPercentage(this.character.energy);
                console.log('Collission with Character');

            }
        });
    }





    checkCollisionsWithChickens() {
        this.level.chickens.forEach((chicken) => {
            if (this.character.isCollidingAtTop(chicken) && !this.character.y <= 180) {
                chicken.hitChicken();
                this.chickenIsDead(chicken);


            } else if (this.character.isColliding(chicken) && this.character.y <= 180) {
                this.character.hit();
                this.hurt_sound.play();
                this.statusBar.setPercentage(this.character.energy);

            }
        });
    }



    chickenIsDead(chicken) {
        this.chickenDead_sound.play();
        setTimeout(() => {
            this.level.chickens.splice(this.level.chickens.indexOf(chicken), 1);
        }, 300);

    }

    miniChickenIsDead(miniChicken) {
        this.chickenDead_sound.play();
        setTimeout(() => {
            this.spawnedChicks.splice(this.spawnedChicks.indexOf(miniChicken), 1);
        }, 300);

    }



    checkCollisionsWithBoss() {
        this.level.boss.forEach((boss) => {
            this.throwableObjects.forEach(bottle => {
                if (bottle.isColliding(boss)) {
                    this.bossBar.setPercentageBoss(this.boss.bossEnergy);
                    this.boss.hitBoss();  //for Animationens
                    boss.hitBoss(); //for Energy bar


                    
                    this.throwableObjects.splice(0, 1);
                    this.miniChickenGenerator();
                } else if (!bottle.isAboveGround()) {
                    this.throwableObjects.splice(0, 1);
                }
            });
        });
    }



    checkCollisionWithCoin() {
        this.level.coin.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.takeCoin();
                this.coinBar.setPercentageCoin(this.character.coin);
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
        this.addObjectsToMap(this.spawnedChicks);
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

    miniChickenGenerator() {
        this.spawnedChicks.push(new MiniChicken());
        setTimeout(() => {
            this.currentImage = 0;
        }, 400);
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