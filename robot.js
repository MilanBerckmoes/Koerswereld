class robot {

  constructor() { //default constructor
    this.xPos = width / 2;
    this.yPos = height / 2;
    this.bodyheadColor = color(200);
    this.bikeColor1 = color(255);
    this.bikeColor2 = color(0);
    this.robotSize = 1;
    this.timeDelay = 500;
    this.timeDelayTrigger = false;
    this.timer = 0;
  }


  display() {
    let x = 400; //x-coordinaat
    let y = 400; //y-coordinaat
    let bodyHeight = 50; //bodyHeight

    fill(22, 122, 191); //blauw
    rect(0, 0, windowWidth, 10);

    fill(201, 30, 72); //rood
    rect(0, 10, windowWidth, 10);

    fill(0, 0, 0); //zwart
    rect(0, 20, windowWidth, 10);

    fill(246, 224, 54); //geel
    rect(0, 30, windowWidth, 10);

    fill(66, 182, 75); //groen
    rect(0, 40, windowWidth, 10);

    strokeWeight(2);
    translate(mouseX, mouseY);  // Move all to (mouseX, y)
    if (mouseIsPressed) {
      scale(2.0); //2 keer zo groot als muis ingedrukt is
    } else {
      scale(this.robotSize);
    }

    //bike
    push();
    if (millis() - this.timer > this.timeDelay) {
      this.timeDelayTrigger = !this.timeDelayTrigger; //change the trigger after each delay
      this.timer = millis();
    }
    if (this.timeDelayTrigger) {
      stroke(this.bikeColor1);
    }
    else {
      stroke(this.bikeColor2);
    }
    noFill();
    ellipse(-40, 0, 50, 50); //achterwiel
    ellipse(50, 0, 50, 50); //voorwiel
    line(-40, 0, 0, 0); //verbinding achterwiel met crank
    line(-40, 0, -10, -40); //achtervork
    line(0, 0, -10, -40); //verbinding crank met zadelpen
    line(-10, -40, -15, -50); //zadelpen
    line(-10, -40, 35, -40); //bovenbuis
    line(35, -40, 0, 0); //onderbuis
    line(35, -40, 50, 0); //voorvork
    ellipse(0, 0, 17, 17); //crank
    line(35, -40, 30, -50); //stuurpen
    line(20, -50, 40, -50); //stuur
    line(-25, -50, -5, -50); //zadel
    line(0, 0, 10, 13); //crankas
    line(5, 13, 15, 13); //pedaal
    pop();

    //body
    fill(this.bodyheadColor);
    rect(-20, -50, 10, -bodyHeight); //body
    line(-20, -bodyHeight - 50, 20, -50); //linkerarm
    line(-10, -bodyHeight - 50, 40, -50); //rechterarm
    ellipse(20, -50, 5, 5); //linkerhand
    ellipse(40, -50, 5, 5); //rechterhand

    //head
    rect(-50, -bodyHeight - 50, 70, -70); //head
    rect(-60, -bodyHeight - 100, 10, 35); //linkeroor
    rect(20, -bodyHeight - 100, 10, 35); //rechteroor
    ellipse(-30, -bodyHeight - 95, 15, 15);//linkeroog
    ellipse(0, -bodyHeight - 95, 15, 15); //rechteroog
    fill(0); //pupillen in zwart
    ellipse(-30, -bodyHeight - 94, 5, 7); //linkerpupil
    ellipse(0, -bodyHeight - 94, 5, 7); //rechterpupil
    fill(this.bodyheadColor); //mond en tanden grijs
    rect(-30, -bodyHeight - 70, 30, 10); //mond
    line(-25, -bodyHeight - 70, -25, -bodyHeight - 60);//tanden
    line(-20, -bodyHeight - 70, -20, -bodyHeight - 60);//tanden
    line(-15, -bodyHeight - 70, -15, -bodyHeight - 60);//tanden
    line(-10, -bodyHeight - 70, -10, -bodyHeight - 60);//tanden
    line(-5, -bodyHeight - 70, -5, -bodyHeight - 60);//tanden
  }

  move() {
    this.xPos = mouseX;
    this.yPos = mouseY;
  }

  isGepakt(bidonOfspuit) {
    return bidonOfspuit.isGepakt(this.xPos, this.yPos, this.w, this.h);
  }
}