class bidon {

    constructor(xPosB, yPosB, speedB, bodycolorB, bidonsizeB) {
        this.xPos = xPosB;
        this.yPos = yPosB;
        this.speedB = speedB;
        this.bodycolorB = bodycolorB;
        this.bidonsizeB = bidonsizeB;
        this.gepakt = false;
    }

    display() {
        push();
        translate(this.xPosB, this.yPosB);
        scale(this.bidonsizeB);

        // Draw bottle
        fill(255);
        stroke(0);
        strokeWeight(2);
        rect(150, 100, 100, 200, 20);

        // Draw cap
        fill(0);
        noStroke();
        rect(170, 70, 60, 30, 7);
        rect(185, 40, 30, 30, 5);
        pop();

    }

    update() {
        this.yPosB += this.speedB;
    }

    isGepakt(robotX, robotY, robotW, robotH) {
        return this.yPosB + 20 >= robotY && this.yPosB + 20 <= robotY + robotH && this.xPosB >= robotX && this.xPosB <= robotX + robotW;
    }
}