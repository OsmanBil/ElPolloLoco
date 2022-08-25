class Character extends MovableObject {

    height = 250;
    y = 180;
    speed = 8;
    coin = 0;
    bottle = 4;
    world;
    walking_sound = new Audio('audio/walk.mp3');
    otherDirectionChar = false;
    gameEnd = false;

    offsetleft = 20;
    offsetRight = 20;
    offsetTop = 20;
    offsetBottom = 20;

    IMAGES_WALKING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png'

    ];

    IMAGES_JUMPING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-31.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-32.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-33.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-34.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-35.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-36.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-37.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-38.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-39.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-40.png'
    ];

    IMAGES_DEAD = [
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-51.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-52.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-53.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-54.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-55.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-56.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-41.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-42.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-43.png'

    ];

    constructor() {
        super().loadImage('img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png');
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }




    //----For animating character animations----
    animate() {

        /*if (this.firstWalk) {
            this.walking_sound.pause();
        }
        */
        this.characterMovement();
        this.characterAnimations();

    }

    //----Jump attributes for character----
    jump() {
        this.speedY = 30;
        this.jump_sound.play();
    }

    //----Character animations----
    characterAnimations() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
            else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 100);
    };

    //----Character movement----
    characterMovement() {
        setInterval(() => {
            this.charSoundStop();
            this.characterMovementToRight();
            this.characterMovementToLeft();
            this.characterMovementJump();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)
    };

    charSoundStop() {
        this.walking_sound.pause();
    }

    characterMovementToRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !world.character.gameEnd) {
            this.moveRight();
            if (!this.isAboveGround()) {
                this.startWalkSound();
            }
            this.otherDirection = false;
            this.otherDirectionChar = false;
        }
    }

    characterMovementToLeft() {
        if (this.world.keyboard.LEFT && this.x > 0 && !world.character.gameEnd) {
            this.moveLeft();
            if (!this.isAboveGround()) {
                this.startWalkSound();
            }
            this.otherDirection = true;
            this.otherDirectionChar = true;
        }
    }

    characterMovementJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround() && !world.character.gameEnd) {
            this.jump();
        }
    }

    startWalkSound() {
        this.walking_sound.play();
    }

}

