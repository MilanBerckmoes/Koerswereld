let myRobot;
let backgroundImg;

function preload() {

    backgroundImg = loadImage('data/cobbles.jpg');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    backgroundImg.resize(width, height);
    myRobot = new robot();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    backgroundImg.resize(width, height);
}

function draw() {
    image(backgroundImg, 0, 0);
    myRobot.display();
}