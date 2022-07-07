class CoinBar extends DrawableObject {

    IMAGES = [
        'img/7.Marcadores/Barra/Marcador moneda/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/100_.png'
    ]

    percentageCoin = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES)
        this.x = 30;
        this.y = 50;
        this.width = 200;
        this.height = 60; 
        this.setPercentageCoin(0);
    }


    setPercentageCoin(percentageCoin) {
        this.percentageCoin = percentageCoin;  // => 0...5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentageCoin == 10) {
            return 5;
        } else if (this.percentageCoin >= 8) {
            return 4;
        } else if (this.percentageCoin >= 6) {
            return 3;
        } else if (this.percentageCoin >= 4) {
            return 2;
        } else if (this.percentageCoin >= 2) {
            return 1;
        } else {
            return 0;
        }
    }








}