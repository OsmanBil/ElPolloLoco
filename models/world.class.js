class World {
    character = new Character();
    boss = new Endboss();
    miniChicken = new MiniChicken();
    statusBar = new StatusBar();
    bossBar = new BossBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    throwableObjects = [];
    spawnedChicks = [];
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    ground = this.y < 380;
    miniChickenx = 500;
    chickenIsDeadStatus = false;
    isFlying = false;
    throw_sound = new Audio('audio/throw.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    chickenDead_sound = new Audio('audio/chickenDead.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.setWorld();
        this.run();
        this.keyboard = keyboard;
    }

    //----Checking if the element is above the ground----
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
        //----Cheking collision between Character and enemies----
        setInterval(() => {
            this.checkCollisionsWithChickens();
            this.checkCollisionsWithMiniChickens();
        }, 80);
        //----Cheking collision between Character and collectables----
        setInterval(() => {
            this.checkCollisionWithCoin();
            this.checkCollisionWithBottle();
        }, 30);
        this.checkDifferentCollisions();
    }

    //----Cheking different collisions and if game is ended----
    checkDifferentCollisions() {
        setInterval(() => {
            this.checkThrowObjects();
            this.checkCollisionsWithBoss();
            this.checkCollisionBottleWithChicken();
            this.checkCollisionBottleWithMiniChicken();
            this.theEnd();
        }, 200);
    }

    //----Checking how to throw bottles----
    checkThrowObjects() {
        if (this.keyboard.D) {
            if (this.character.bottle >= 1 && !this.character.gameEnd) {
                if (!this.character.otherDirectionChar) {
                    this.throwBottleToRight();
                    //this.isFlying = true;
                } else if (this.character.otherDirectionChar) {
                    this.throwBottleToLeft();
                }
            }
        }
    }

    //----Checking collision between bottle and mini Chicken----
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

    //----Checking collision between character and mini Chicken----
    checkCollisionsWithMiniChickens() {
        this.spawnedChicks.forEach((miniChicken) => {
            if (this.character.isCollidingAtTop(miniChicken) && !this.character.y <= 180) {
                miniChicken.hitChicken();
                this.miniChickenIsDead(miniChicken);
                this.chickenIsDeadStatus = true;
                setTimeout(() => {
                    this.chickenIsDeadStatus = false;
                }, 400);

            } else if (this.chickenIsDeadStatus == false && this.character.isColliding(miniChicken) && this.character.y == 180) {
                this.character.hit();
                this.hurt_sound.play();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    //----Checking collision between Character and Chicken----
    checkCollisionsWithChickens() {
        this.level.chickens.forEach((chicken) => {
            if (this.character.isCollidingAtTop(chicken) && this.character.y < 180) {
                chicken.hitChicken();
                this.chickenIsDead(chicken);
                this.chickenIsDeadStatus = true;
                setTimeout(() => {
                    this.chickenIsDeadStatus = false;
                }, 400);
            } else if (this.chickenIsDeadStatus == false && this.character.isColliding(chicken) && this.character.y == 180) {
                this.character.hit();
                this.hurt_sound.play();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }


    //----Chicken dead attributes----
    chickenIsDead(chicken) {
        this.chickenDead_sound.play();
        setTimeout(() => {
            this.level.chickens.splice(this.level.chickens.indexOf(chicken), 1);
        }, 300);
    }

    //----Mini Chicken dead attributes----
    miniChickenIsDead(miniChicken) {
        this.chickenDead_sound.play();
        setTimeout(() => {
            this.spawnedChicks.splice(this.spawnedChicks.indexOf(miniChicken), 1);
        }, 300);
    }


    //----Checking collision between Bottles and Boss----
    checkCollisionsWithBoss() {
        this.level.boss.forEach((boss) => {
            this.throwableObjects.forEach(bottle => {
                if (bottle.isColliding(boss)) {
                    this.boss.hitBoss();
                    boss.hitBoss();
                    this.bossBar.setPercentageBoss(this.boss.bossEnergy);
                    this.chickenDead_sound.play();
                    setTimeout(() => {
                        this.throwableObjects.splice(0, 1);
                    }, 100);
                    this.miniChickenGenerator();
                } else if (!bottle.isAboveGround()) {
                    this.throwableObjects.splice(0, 1);
                }
            });
        });
    }

    //----Checking collision between Bottles and Chicken----
    checkCollisionBottleWithChicken() {
        this.level.chickens.forEach((chicken) => {
            this.throwableObjects.forEach(bottle => {
                if (bottle.isColliding(chicken)) {
                    chicken.hitChicken();
                    this.chickenIsDead(chicken);
                    setTimeout(() => {
                        this.throwableObjects.splice(0, 1);
                    }, 100);
                } else if (!bottle.isAboveGround()) {
                    this.throwableObjects.splice(0, 1);
                }
            });
        });
    }

    //----Checking collision between Character and Coins----
    checkCollisionWithCoin() {
        this.level.coin.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.takeCoin();
                this.coinBar.setPercentageCoin(this.character.coin);
                this.level.coin.splice(this.level.coin.indexOf(coin), 1);
            }
        });
    }


    //----Checking collision between Character and Bottles----
    checkCollisionWithBottle() {
        this.level.bottle.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.character.bottle < 5) {
                this.character.takeBottle();
                this.bottleBar.setPercentageBottle(this.character.bottle);
                this.level.bottle.splice(this.level.bottle.indexOf(bottle), 1);
            }
        });
    }

    //----Drawing map----
    draw() {
        this.addNonFixedObjects()
        //----Draw is called again and agin----
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
        this.ctx.translate(-this.camera_x, 0);
        this.addFixedObjects();
    }

    // ----Non fixed objects ----
    addNonFixedObjects() {
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
        this.addToMap(this.bossBar);
    }

    // ----Fixed objects ----
    addFixedObjects() {
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
    }

    //----Generates mini Chickens----
    miniChickenGenerator() {
        this.spawnedChicks.push(new MiniChicken());
        setTimeout(() => {
            this.currentImage = 0;
        }, 400);
    }

    //----Splicing all enemies when game is over----
    theEnd() {
        if (this.character.gameEnd) {
            this.spawnedChicks.splice(0, 1);
            this.level.chickens.splice(0, 1);
        }
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

    //----How to throw bottles to left----
    throwBottleToLeft() {
        let bottle = new ThrowableObject(this.character.x - 50, this.character.y + 100)
        this.throwBottleTo(bottle);
    }

    //----How to throw bottles to right----
    throwBottleToRight() {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
        this.throwBottleTo(bottle);
    }

    throwBottleTo(bottle) {
        this.throwableObjects.push(bottle);
        this.character.bottle -= 1;
        this.bottleBar.setPercentageBottle(this.character.bottle);
        this.throw_sound.play();
    }
}