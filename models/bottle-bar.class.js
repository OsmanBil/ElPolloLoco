class BottleBar extends DrawableObject {

    IMAGES = [
        'img/7.Marcadores/Barra/Marcador_botella/Azul/0_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/20_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/40_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/60_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/80_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/100_.png'
    ]

    percentageBottle = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES)
        this.x = 30;
        this.y = 100;
        this.width = 200;
        this.height = 60; 
        this.setPercentageBottle(0);
    }


    setPercentageBottle(percentageBottle) {
        this.percentageBottle = percentageBottle;  // => 0...5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentageBottle == 5) {
            return 5;
        } else if (this.percentageBottle >= 4) {
            return 4;
        } else if (this.percentageBottle >= 3) {
            return 3;
        } else if (this.percentageBottle >= 2) {
            return 2;
        } else if (this.percentageBottle >= 1) {
            return 1;
        } else {
            return 0;
        }
    }








}