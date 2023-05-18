class spuit {

    constructor(xPosS, yPosS, speedS, bodycolorS, spuitsizeS) {
        this.xPos = xPosS;
        this.yPos = yPosS;
        this.speed = speedS;
        this.bodycolor = bodycolorS;
        this.spuitSize = spuitsizeS;
    }

    display() {
        push();
        translate(this.xPos, this.yPos);
        scale(this.spuitSize);

        //teken spuit body
        fill(255, 0, 0);
        strokeWeight(2);
        stroke(255);
        rect(150, 200, 100, 30);

        //teken spuit plunger
        fill(255, 0, 0);
        line(250, 215, 280, 215);
        line(280, 200, 280, 230);

        //teken spuit naald
        fill(0);
        rect(130, 210, 20, 10);
        line(130, 215, 90, 215);

        //teken maataanduidingen
        line(160, 200, 160, 210);
        line(170, 200, 170, 205);
        line(180, 200, 180, 210);
        line(190, 200, 190, 205);
        line(200, 200, 200, 210);
        pop();
    }

    update() {
        this.yPos += this.speed
    }
    //functie om te kijken of spuit genomen is
    isGenomen(robotX, robotY) {
        if (dist(robotX - 100, robotY - 50, this.xPos, this.yPos) < 50) {
            return true;
        }
        else {
            return false;
        }
    }
}