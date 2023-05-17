class Raindrop {
    constructor(x, y, angle, windSpeed) {
        this.position = createVector(x, y);
        this.angle = angle;
        this.speed = windSpeed;
        this.length = random(10, 20);
        this.strokeWeight = 1;
        this.direction = p5.Vector.fromAngle(radians(this.angle), this.speed);
    }

    update() {
        this.position.add(this.direction);

        // Wrap the raindrops around the canvas
        if (this.position.x < 0) {
            this.position.x = width;
        } else if (this.position.x > width) {
            this.position.x = 0;
        }

        if (this.position.y < 0) {
            this.position.y = height;
        } else if (this.position.y > height) {
            this.position.y = 0;
        }
    }

    display() {
        push();
        stroke(255);
        strokeWeight(this.strokeWeight);
        line(
            this.position.x,
            this.position.y,
            this.position.x + cos(radians(this.angle)) * this.length,
            this.position.y + sin(radians(this.angle)) * this.length
        );
        pop();
    }
}