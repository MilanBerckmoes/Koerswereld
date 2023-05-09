let myRobot;
let backgroundImg;
let bidon = [];
let spuit = [];
let score = 0;
let timeLeft = 20;

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
    myRobot.update(); //beweeg robot met muis
    myRobot.display(); //teken robot

    //teken bidons
    for (let i = bidon.length - 1; i >= 0; i--) {
        let bidon = bidon[i];
        bidon.update();
        bidon.display();

        // kijken of bidon gepakt is
        if (myRobot.isGepakt(bidon)) {
            bidon.splice(i, 1);
        }

        // kijken of bidon gemist is
        if (bidon.y > height) {
            bidon.splice(i, 1);
        }
    }

    //teken spuiten
    for (let i = spuit.length - 1; i >= 0; i--) {
        let spuit = spuit[i];
        spuit.update();
        spuit.display();


        //kijken of spuit gepakt is
        if (myRobot.isGepakt(spuit)) {
            score--;
            spuit.splice(i, 1);
        }

        //kijken of spuit gemist is
        if (spuit.y > height) {
            spuit.splice(i, 1);
        }
    }

    // Voeg nieuwe bidon of spuit toe elke seconde
    if (frameCount % 60 == 0) {
        if (random(1) < 0.5) {
            bidon.push(new bidon(random(width), 0, random(3, 5)));
        }
        else {
            spuit.push(new spuit(random(width), 0, random(3, 5)));
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