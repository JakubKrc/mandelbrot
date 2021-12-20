class collisionObj extends drawObj {
    checkOverlap({ x: x, y: y, width: width, height: height }) {
        if ((this.x < x + width) && (this.x + this.width > x) &&
            (this.y < y + height) && (this.y + this.height > y)) {
            this.collision = true;
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=collisions.js.map