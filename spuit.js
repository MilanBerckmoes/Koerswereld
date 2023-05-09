class spuit {

    constructor(xPosS, yPosS, speedS, bodycolorS, spuitsizeS) {
        this.xPos = xPosS;
        this.yPos = yPosS;
        this.speedB = speedS;
        this.bodycolorB = bodycolorS;
        this.spuitSize = spuitsizeS;
        this.nietgepakt = true;
    }

    display() {
        push();
        translate(this.xPos, this.yPos);
        scale(this.spuitSize);

        // draw spuit body
        fill(255, 255, 255);
        strokeWeight(2);
        stroke(0);
        rect(150, 200, 100, 30);

        // draw spuit plunger
        fill(255, 0, 0);
        line(250, 215, 280, 215);
        line(280, 200, 280, 230);

        // draw spuit naald
        fill(0);
        rect(130, 210, 20, 10);
        line(130, 215, 90, 215);

        // draw maataanduidingen
        line(160, 200, 160, 210);
        line(170, 200, 170, 205);
        line(180, 200, 180, 210);
        line(190, 200, 190, 205);
        line(200, 200, 200, 210);
        pop();
    }

    move() { //de spuit laten vallen vanuit de lucht
        this.yPosS += this.speedS;
    }

    isGepakt() {
        if (dist(mouseX, mouseY, this.xPos, this.yPos) < 40) {
            this.nietgepakt = false;
        }
    }
}