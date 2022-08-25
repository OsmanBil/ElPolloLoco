let canvas;
let world;
let keyboard = new Keyboard();
let intervals = [];


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    game_sound = new Audio('audio/music.mp3');
}

//----Event listener for using keys - keydown----
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

//----Event listener for using keys - keyup----
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});

//----Loading game----
function startGame() {
    initLevel1();
    init();

    var element = document.getElementById("startScreen");
    element.classList.add("displayNone");

    var element = document.getElementById("theEndScreen");
    element.classList.remove("displayNone");

    var element = document.getElementById("theEndScreenLost");
    element.classList.remove("displayNone");

    var element = document.getElementById("canvas");
    element.classList.remove("displayNone");
}

//----Restart game----
function reStartGame() {
    window.location.href = window.location.href;
}


//----Mobile Keys----
function mobileRightDown() {
    keyboard.RIGHT = true;
}

function mobileRightUp() {
    keyboard.RIGHT = false;
}

function mobileLeftDown() {
    keyboard.LEFT = true;
}

function mobileLeftUp() {
    keyboard.LEFT = false;
}

function mobileSpaceDown() {
    keyboard.SPACE = true;
}

function mobileSpaceUp() {
    keyboard.SPACE = false;
}

function mobileThrowDown() {
    keyboard.D = true;
}

function mobileThrowUp() {
    keyboard.D = false;
}