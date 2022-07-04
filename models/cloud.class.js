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
        this.moveLeft();
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path]
            this.currentImage++;
        }, 200);
    }



}
