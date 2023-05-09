let myRobot;
let backgroundImg;
let bidons = [];
let spuiten = [];
let score;
let timeLeft = 20;

function preload() {
    backgroundImg = loadImage('data/cobbles.jpg');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    backgroundImg.resize(width, height);
    myRobot = new robot();
    myRobot.yPos = 500;
    score = 0;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    backgroundImg.resize(width, height);
}

function draw() {
    image(backgroundImg, 0, 0);
    myRobot.display(); //teken robot

    //teken bidons
    for (let i = bidons.length - 1; i >= 0; i--) {
        let bidons = bidons[i];
        bidons.update();
        bidons.display();

        // kijken of bidon gepakt is
        if (myRobot.isGepakt(bidons)) {
            bidons.splice(i, 1);
        }

        // kijken of bidon gemist is
        if (bidons.y > height) {
            bidons.splice(i, 1);
        }
    }

    //teken spuiten
    for (let i = spuiten.length - 1; i >= 0; i--) {
        let spuiten = spuiten[i];
        spuiten.update();
        spuiten.display();


        //kijken of spuit gepakt is
        if (myRobot.isGepakt(spuiten)) {
            score--;
            spuiten.splice(i, 1);
        }

        //kijken of spuit gemist is
        if (spuiten.y > height) {
            spuiten.splice(i, 1);
        }
    }

    // Voeg nieuwe bidon of spuit toe elke seconde
    if (frameCount % 60 == 0) {
        if (random(1) < 0.5) {
            bidons.push(new bidons(random(width), 0, random(3, 5)));
        }
        else {
            spuiten.push(new spuiten(random(width), 0, random(3, 5)));
        }

    }

    // Toon score en time left
    textSize(20);
    text('Score = ' + score, 20, 30);
    text('Time left: ' + timeLeft, width - 140, 30);

    // Verminder time left
    timeLeft -= 1 / 60;

    //beëindig spel als de tijd op is
    if (timeLeft <= 0) {
        noLoop();
        textSize(30);
        text('Game over! Your score is ' + score, width / 2 - 170, height / 2);
    }
}