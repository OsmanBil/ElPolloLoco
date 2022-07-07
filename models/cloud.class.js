class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;

    IMAGES_WALKING = ['img/5.Fondo/Capas/4.nubes/1.png'
    ];

    constructor() {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png')
        this.loadImages(this.IMAGES_WALKING);
        this.x = 0 + Math.random() * 500; //Zahl zwischen 0 und 700
        this.speed = 0.15 ;
        this.animate();
    }

    animate() {

        

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);


        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }


}
