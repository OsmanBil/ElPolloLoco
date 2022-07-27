let level1;
function initLevel1() {

    level1 = new Level(


        [
            new Cloud()
        ],

        [
            new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', -719),
            new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', -719),
            new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', -719),
            new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', -719),

            new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0),
            new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 0),
            new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 0),
            new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 0),
            new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 719),
            new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 719),
            new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 719),
            new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 719),

            new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 719 * 2),
            new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 719 * 2),
            new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 719 * 2),
            new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 719 * 2),

            new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 719 * 3),
            new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 719 * 3),
            new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 719 * 3),
            new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 719 * 3)


        ],
        [



            new Coin(900, 200),
            new Coin(950, 200),
            new Coin(1000, 200),
            new Coin(1100, 200)

        ],

        [
            new Bottle(300, 200),
            new Bottle(400, 200),
            new Bottle(500, 200),
            new Bottle(700, 200),
            new Bottle(800, 200)

        ],
        
        [
            
           new Chicken(),
            new Chicken(),
            new Chicken()
            
        ],
        [
            new Endboss()
        ],

        [
           new MiniChicken()
        ]


    );
}