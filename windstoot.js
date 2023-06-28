class windStoot {
    constructor(x, y, angle, windSpeed) {
        this.position = createVector(x, y);
        this.angle = angle; //hoek waarin de windvlagen bewegen
        this.speed = windSpeed; //windsnelheid
        this.length = random(10, 20); //lengte van de windvlagen variërend tussen 10 en 20
        this.strokeWeight = 1; //dikte van de lijnen
        this.direction = p5.Vector.fromAngle(radians(this.angle), this.speed);
    }

    update() {
        this.position.add(this.direction);
        if (this.position.x < 0) {
            this.position.x = width; //Als de horizontale positie (x) van de windstoot kleiner is dan 0, wordt deze ingesteld op de breedte van het canvas (width). Dit zorgt ervoor dat de windstoot aan de linkerkant van het canvas "terugkomt" als deze het canvas verlaat.
        } else if (this.position.x > width) {
            this.position.x = 0; //Als de horizontale positie (x) van de windstoot groter is dan de breedte van het canvas, wordt deze ingesteld op 0. Dit zorgt ervoor dat de windstoot aan de rechterkant van het canvas "terugkomt".
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
        line(this.position.x,
            this.position.y,
            this.position.x + cos(radians(this.angle)) * this.length,
            this.position.y + sin(radians(this.angle)) * this.length);
        pop();
    } //de lijn w getekend vanaf de huidige positie naar een eindpunt dat dat berekend w obv de hoek en de lengte
}