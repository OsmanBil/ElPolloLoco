class ThrowableObject extends MovableObject {

    bottleBreak = false;
    world;

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

    throw() {
        this.speedY = 10;
        this.applyGravity();


        setInterval(() => {
            if (this.isAboveGround()) {
                this.x += 10;
            }
        }, 25);

    }

    animate() {

        setInterval(() => {

            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_ROTATE);

            } else if(this.bossIsHurt()){
                this.playAnimation(this.IMAGES_BREAK);
            }
            else{

                this.playAnimation(this.IMAGES_BREAK);

            }



        }, 100);
    }



}
