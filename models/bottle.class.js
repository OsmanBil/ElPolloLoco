class Bottle extends DrawableObject {
    
    x = 150;
    y = 300;
    width = 100;
    height = 150;

    constructor(x, y) {
        super().loadImage('img/6.botella/1.Marcador.png');
        this.x = x;
        this.y = y;
    }

}