class Coin extends DrawableObject {
    
    x = 150;
    y = 300;
    width = 100;
    height = 150;

    offsetleft = 20;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    constructor(x, y) {
        super().loadImage('img/8.Coin/Moneda2.png');
        this.x = x;
        this.y = y;
    }

}