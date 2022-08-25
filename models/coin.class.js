class Coin extends DrawableObject {
    
    x = 150;
    y = 300;
    width = 100;
    height = 150;

    offsetleft = 20;
    offsetRight = 20;
    offsetTop = 20;
    offsetBottom = 20;

    constructor(x, y) {
        super().loadImage('img/8.Coin/Moneda2.png');
        this.x = x;
        this.y = y;
    }

}