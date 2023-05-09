class spuit {

    constructor(xPosS, yPosS, speedS, bodycolorS, spuitsizeS) {
        this.xPos = xPosS;
        this.yPos = yPosS;
        this.speedB = speedS;
        this.bodycolorB = bodycolorS;
        this.bidonsizeB = spuitsizeS;
        this.gepakt = false;
    }

    display() {
        push();
        translate(this.xPosS, this.yPosS);
        scale(this.spuitsizeS);

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

    update() {
        this.yPosS += this.speedS;
    }

    isGepakt(robotxPos, robotyPos, robotW, robotH) {
        return this.yPosS + 20 >= robotyPos && this.yPosS + 20 <= robotyPos + robotH && this.xPosS >= robotxPos && this.xPosS <= robotxPos + robotW;
    }
}