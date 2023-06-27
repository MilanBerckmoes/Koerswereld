let myRobot;
let backgroundImg;
let bidons = [];
let spuiten = [];
let score;
let timeLeft = 20;
let restartButton;
let gameSound;
let startButton;
let gameOn = false;

let windstoten = [];
let windRichting;
let weatherData;
let windSnelheid;
let windDirection;

let level = 1;
let nextLevelButton;

//weerdata ophalen en windsnelheid obv windstoten en angle obv degree
//gotWeatherData is de functie, deze heeft als parameter de variabele 'data'
function gotWeatherData(data) {
    weatherData = data;
    if (weatherData) {
        windSnelheid = weatherData.wind.gust;
        windDirection = weatherData.wind.deg;
        windRichting = windDirection;
    }
}

function preload() {
    //Load current weatherdata in Kortrijk
    loadJSON('https://api.openweathermap.org/data/2.5/weather?q=Kortrijk,be&appid=276a00d1cf36f1c2b52ae48758fce6ea', gotWeatherData);
    //geluidsfragmenten inladen
    soundFormats('mp3');

    gameSound = loadSound('data/Rodania1.mp3');
    winningSound = loadSound('data/TomBoonen1.mp3');
    bidonSound = loadSound('data/bidonsound1.mp3');
    spuitSound = loadSound('data/spuitsound1.mp3');
    //achtergrondfoto inladen
    backgroundImg = loadImage('data/cobbles.jpg');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    backgroundImg.resize(width, height);
    //robot toevoegen
    myRobot = new robot(70, -70, 5); //custom constructor voor de robot
    myRobot.yPos = height - 50;
    score = 0;
    //startknop toevoegen
    startButton = createButton("Play!");
    startButton.mouseClicked(gameStarted);
    startButton.size(100, 50);
    startButton.style("font-family", "Arial");
    startButton.style("font-size", "20px");
    startButton.position(width / 2 - 50, height / 2 + 50);
    //replay knop toevoegen
    restartButton = createButton("Replay!");
    restartButton.mouseClicked(restart);
    restartButton.size(100, 50);
    restartButton.style("font-family", "Arial");
    restartButton.style("font-size", "20px");
    restartButton.position(width / 2 - 50, height / 2 + 50);
    restartButton.hide();
    //knop voor volgend level toevoegen
    nextLevelButton = createButton("Next Level!");
    nextLevelButton.mouseClicked(nextLevel);
    nextLevelButton.size(100, 50);
    nextLevelButton.style("font-family", "Arial");
    nextLevelButton.style("font-size", "20px");
    nextLevelButton.position(width / 2 - 50, height / 2 + 150);
    nextLevelButton.hide();

    //windstoten genereren zodat ze in dezelfde richting en snelheid vallen als het huidige weer in Kortrijk
    //Deze code genereert 100 keer willekeurige waarden voor de positie en windsnelheid van een windStoot object. De gegenereerde waarden worden toegevoegd aan de windstoten array.
    for (let i = 0; i < 100; i++) {
        let x = random(width);
        let y = random(height);
        let windSpeed = windSnelheid;
        windstoten.push(new windStoot(x, y, windRichting, windSpeed));
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    backgroundImg.resize(width, height);
}

function draw() {
    image(backgroundImg, 0, 0);
    myRobot.display(); //teken robot

    //windvlagen updaten en tekenen
    for (let i = 0; i < windstoten.length; i++) {
        let vlagen = windstoten[i];
        vlagen.update();
        vlagen.display();
    }

    if (!gameOn) { //uitleg game toegevoegd voor het spel begint
        fill(255);
        textSize(20);
        text('Probeer de bidons te vangen maar ontwijk de doping!', width / 2 - 200, height / 2 - 100)
    }

    if (gameOn) {
        //teken bidons
        for (let i = bidons.length - 1; i >= 0; i--) {
            let bidon = bidons[i];
            bidon.update();
            bidon.display();

            // kijken of bidon gepakt is
            if (myRobot.isRaak(bidon)) {
                score++;
                bidons.splice(i, 1);
                bidonSound.play();
            }

            // kijken of bidon gemist is
            if (bidon.yPos > height) {
                bidons.splice(i, 1);
            }
        }

        //teken spuiten
        for (let i = spuiten.length - 1; i >= 0; i--) {
            let spuit = spuiten[i];
            spuit.update();
            spuit.display();

            //kijken of spuit gepakt is
            if (myRobot.isRaak(spuit)) {
                score--;
                spuiten.splice(i, 1);
                spuitSound.play();
            }

            //kijken of spuit gemist is
            if (spuit.yPos > height) {
                spuiten.splice(i, 1);
            }
        }

        // Voeg nieuwe bidon of spuit toe elke seconde afh van welk level
        if (frameCount % 60 == 0) {
            if (level == 1) {
                if (random(1) < 0.5) {
                    bidons.push(new bidon(random(width), 0, random(3, 7), color(200), 0.3));
                }
                else {
                    spuiten.push(new spuit(random(width), 0, random(3, 7), color(200), 0.5));
                }
            }
            if (level == 2) {
                if (random(1) < 0.5) {
                    bidons.push(new bidon(random(width), 0, random(7, 11), color(200), 0.3));
                }
                else {
                    spuiten.push(new spuit(random(width), 0, random(7, 11), color(200), 0.5));
                }
            }
            if (level == 3) {
                if (random(1) < 0.5) {
                    bidons.push(new bidon(random(width), 0, random(11, 15), color(200), 0.3));
                }
                else {
                    spuiten.push(new spuit(random(width), 0, random(11, 15), color(200), 0.5));
                }
            }
        }

        // Toon score, time left en level
        fill(255);
        textSize(20);
        text('Score = ' + score, 20, 30);
        text('Time left: ' + timeLeft, width - 140, 30);
        text('Level ' + level, width / 2, 30);
        // Verminder time left
        timeLeft -= 1 / 60;

        //beëindig spel als de tijd op is
        if (timeLeft <= 0) {
            noLoop();
            gameSound.stop();
            winningSound.play();
            textSize(30);
            text('Game over! Your score is ' + score, width / 2 - 170, height / 2);
            restartButton.show();
            if (level < 3) {
                nextLevelButton.show();
            }
        }
    }
}
//functie om game en gameSound te starten
function gameStarted() {
    gameOn = true;
    gameSound.play();
    loop(); //loop zorgt ervoor dat de 'draw' functie herhaaldelijk w opgeroepen
    startButton.hide();
}
//functie voor de game te herstarten dmv replay knop
function restart() {
    score = 0;
    timeLeft = 20;
    bidons = []; //hierdoor w alle eerder opgeslagen bidons & spuiten verwijderd, om zo het spel opnieuw op te starten
    spuiten = [];
    winningSound.stop();
    gameSound.play();
    level = 1;
    loop();
    restartButton.hide();
    nextLevelButton.hide();
    gameOn = true;
}
//functie voor naar volgend level te gaan
function nextLevel() {
    level += 1;
    score = 0;
    timeLeft = 20;
    bidons = [];
    spuiten = [];
    winningSound.stop();
    gameSound.play();
    loop();
    nextLevelButton.hide();
    restartButton.hide();
    gameOn = true;
}
