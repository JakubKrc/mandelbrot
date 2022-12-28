class playableObj extends rigidObj {
    constructor(x = 0, y = 0, width = 0, height = 0, applyGravity = true, immovable = true) {
        super(x, y, width, height, applyGravity, immovable);
        this.moveXspeed = 0;
        this.moveYspeed = 0;
        this.jumpFromWhere = 0;
        this.jumpAgain = true;
    }
    jump(jumpContinue, height, speed) {
        if (this.collision == "bottom" && jumpContinue == false)
            this.jumpAgain = true;
        if (jumpContinue && this.jumpAgain && this.jumpFromWhere == 0) {
            this.jumpFromWhere = this.y;
            this.jumpAgain = false;
        }
        let jumpHeight = (this.jumpFromWhere - this.y) + 1;
        if (!this.jumpAgain && jumpContinue && jumpHeight < height && this.jumpFromWhere != 0 && this.collision != "top")
            this.addVector(Math.PI / 2, 0.3 + 0.2 / (jumpHeight / height)); //ma tvoju reklamaciu, pokus o lepsie skok! ale nie, aj tak to bolo zle aj toto treba vyladit.
        else
            this.jumpFromWhere = 0;
    }
}
//# sourceMappingURL=playable.js.map