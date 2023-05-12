class bidon {

    constructor(xPosB, yPosB, speedB, bodycolorB, bidonsizeB) {
        this.xPos = xPosB;
        this.yPos = yPosB;
        this.speedB = speedB;
        this.bodycolorB = bodycolorB;
        this.bidonSize = bidonsizeB;
        this.nietgenomen = true;
    }

    display() {
        push();
        translate(this.xPos, this.yPos);
        scale(this.bidonSize);

        // Draw bottle
        fill(0, 120, 255);
        stroke(0);
        strokeWeight(2);
        rect(0, 0, 100, 200, 20);

        // Draw cap
        fill(0);
        noStroke();
        rect(20, -30, 60, 30, 7);
        rect(35, -60, 30, 30, 5);
        pop();

    }

    update() {
        this.yPos += this.speedB
    }


    isGenomen(robotX, robotY) {
        if (dist(robotX, robotY, this.xPos, this.yPos) < 50) {
            return true;
        }
        else {
            return false;
        }
    }

    isGepakt(robotX, robotY, robotW, robotH) {
        return this.yPos + 20 >= robotY && this.yPos + 20 <= robotY + robotH && this.xPos >= robotX && this.xPos <= robotX + robotW;
    }
}