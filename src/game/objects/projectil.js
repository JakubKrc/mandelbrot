class projectilObj extends moveObj {
    constructor(x, y, width, height, speed, angle, applyGravity) {
        super(x, y, width, height, applyGravity);
        this.speed = speed;
        this.angle = angle;
        this.applyGravity = false;
    }
    todo() {
        this.setResistance(0.10, 0);
        if (this.applyGravity)
            this.vector(3 * Math.PI / 2, gravity);
        this.move();
    }
}
//# sourceMappingURL=projectil.js.map