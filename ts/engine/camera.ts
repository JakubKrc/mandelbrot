class cameraClass extends rigidObj {

    constructor (x: number, y: number) {
        super(x, y, 0, 0, false, false);
        this.moveXspeed = 0;
        this.moveYspeed = 0;
    }

    followObject ( obj : any ){

        let middleObjX = obj.x + obj.width/2;
        let middleObjY = obj.y + obj.height/2;

        if (this.x + canvas.width/2 + 30 > middleObjX) this.addVector (Math.PI, 0.3);
        if (this.x + canvas.width/2 - 30 < middleObjX) this.addVector (Math.PI*2, 0.3);
        if (this.y + canvas.height/2 + 20 < middleObjY) this.addVector (3*Math.PI/2, 0.3);
        if (this.y + canvas.height/2 - 20 > middleObjY) this.addVector (Math.PI/2, 0.3);

        if (this.x < middleObjX -30) this.setResistance (0.25, 0);
        if (this.x > middleObjX +30) this.setResistance (0.25, 0);
        if (this.y < middleObjY -20) this.setResistance (0, 0.25);
        if (this.y > middleObjY +20) this.setResistance (0, 0.25);

    }

}