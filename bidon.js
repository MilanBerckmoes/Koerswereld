class bidon {

    constructor(xPosB, yPosB, speedB, bodycolorB, bidonsizeB) {
        this.xPos = xPosB;
        this.yPos = yPosB;
        this.speedB = speedB;
        this.bodycolorB = bodycolorB;
        this.bidonSize = bidonsizeB;
        this.nietgepakt = true;
    }

    display() {
        push();
        translate(this.xPos, this.yPos);
        scale(this.bidonSize);

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

    move() {
        this.yPosB += this.speedB;
    }

    isGepakt(robotX, robotY, robotW, robotH) {
        return this.yPosB + 20 >= robotY && this.yPosB + 20 <= robotY + robotH && this.xPosB >= robotX && this.xPosB <= robotX + robotW;
    }

    isGepakt() {
        if (dist(mouseX, mouseY, this.xPos, this.yPos) < 40) {
            this.nietgepakt = false;
        }
    }
}