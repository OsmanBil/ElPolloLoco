class BossBar extends DrawableObject {
    percentageBoss = 100;

    IMAGES = [
        'img/7.Marcadores/Barra/Marcador vida/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/100_.png'
    ]

    constructor() {
        super();
        this.loadImages(this.IMAGES)
        this.x = 2400;
        this.y = 0;
        this.width = 200;
        this.height = 60; 
        this.setPercentageBoss(100);
    }

    //----Setting percentage for boss----
    setPercentageBoss(percentageBoss) {
        this.percentageBoss = percentageBoss;  // => 0...5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    //----resolve image for boss health bar----
    resolveImageIndex() {
        if (this.percentageBoss == 100) {
            return 5;
        } else if (this.percentageBoss >= 80) {
            return 4;
        } else if (this.percentageBoss >= 60) {
            return 3;
        } else if (this.percentageBoss >= 40) {
            return 2;
        } else if (this.percentageBoss >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}