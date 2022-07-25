class MiniChicken extends MovableObject {

    height = 60;
    width = 80;
    y = 360;

   


    IMAGES_WALKING = ['img/3.Secuencias_Enemy_básico/Versión_pollito/1.Paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_pollito/2.Centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_pollito/3.Paso_izquierdo.png'
    ];

    IMAGES_DEAD = [
        'img/3.Secuencias_Enemy_básico/Versión_pollito/4.Muerte.png'
    ];

        
    energy = 5;

    constructor() {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_pollito/1.Paso_derecho.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500
        this.speed = 1.55 + Math.random() * 0.5;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);





        setInterval(() => {
            if (this.chickenIsDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.speed = 0;
            }else{
                this.playAnimation(this.IMAGES_WALKING);
            }

            
        }, 200);


    }

    /*chickenIsDead(status){
        this.chickenIsDead = status;
    }
*/
}