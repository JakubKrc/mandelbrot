class basicObj {
    constructor(x, y, width, height) {
        this.collision = "0";
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = this.constructor.name;
    }
    todo() { }
    ;
}
class drawObj extends basicObj {
    draw(color = "blue") {
        if (this.collision != "0")
            color = "red";
        canvasCtx.fillStyle = color;
        canvasCtx.fillRect(-camera.x + this.x, -camera.y + this.y, this.width, this.height);
    }
}
class overlapObj extends drawObj {
    checkOverlap(x, y, width, height) {
        if ((this.x < x + width) && (this.x + this.width > x) &&
            (this.y < y + height) && (this.y + this.height > y)) {
            this.collision = "sdf";
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=general.js.map