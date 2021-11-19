class crosshairClass {
    constructor(radius, crosshairColor) {
        this.x;
        this.y;
        this.radius = radius;
        this.aimingAngle;
        this.crosshairColor = crosshairColor;
        this.crosshairActive = true;
    }
    calculateCroshairDirectionToMouse() {
        this.aimingAngle = Math.atan((this.y - mousePos.y) / (this.x - mousePos.x));
        if ((this.x) >= mousePos.x)
            this.aimingAngle += Math.PI;
    }
    draw() {
        canvasCtx.fillStyle = this.crosshairColor;
        canvasCtx.fillRect(this.x - 3 + Math.cos(this.aimingAngle) * this.radius, this.y - 3 + Math.sin(this.aimingAngle) * this.radius, 6, 6);
    }
    setPosition({ x: x, y: y, width: width, height: height }) {
        this.x = x + width / 2;
        this.y = y + height / 2;
    }
}
//# sourceMappingURL=crosshair.js.map