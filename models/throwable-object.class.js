class ThrowableObject extends MovableObject {
    bottleBreak = false;
    world;
    offsetleft = 0;
    offsetRight = 0;
    offsetTop = 0;
    offsetBottom = 0;

    IMAGES_BREAK = [
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 7.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 8.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 9.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 10.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 11.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 12.png'
    ];

    IMAGES_ROTATE = [
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 4.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 5.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 6.png'
    ];

    constructor(x, y) {
        super().loadImage('img/7.Marcadores/Icono/Botella.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
        this.loadImages(this.IMAGES_BREAK);
        this.loadImages(this.IMAGES_ROTATE);
        this.animate();
    }


    //----Attributes for throwing bottle and direction----
    throw() {
        this.speedY = 10;
        this.applyGravityBottle();
        this.flyManager();
    }

    flyManager() {
        var timer = setInterval(() => {
            if (this.isAboveGround()) {
                if (!world.character.otherDirectionChar) {
                    this.x += 10;
                }
                if (world.character.otherDirectionChar) {
                    this.x -= 5;
                }
            }

        }, 25);
    }


    flyingTime() {
        setInterval(() => {
            this.isFlying = false;
        }, 400);

    }

    //----For animating throwing bottles----
    animate() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_ROTATE);
                /*} else if (boss.isHurtBossIntern) {
                    this.playAnimation(this.IMAGES_BREAK);
                    boss.isHurtBossIntern = false;*/
            }
            else {
                this.playAnimation(this.IMAGES_BREAK);
            }
        }, 100);
    }
}
