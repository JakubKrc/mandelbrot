class crosshairClass {

    circleX:number; circleY:number;
    radius:number;
    aimingAngle:number;
    crosshairColor:string;
    crosshairActive:boolean;
    x:number; y:number;


    constructor (radius:number, crosshairColor:string){

        this.circleX;
        this.circleY;
        this.radius = radius;
        this.aimingAngle;
        this.crosshairColor = crosshairColor;
        this.crosshairActive = true;

    }

    calculateCroshairDirectionToMouse() {
        this.aimingAngle = - Math.atan ( (-camera.y + this.circleY - mousePos.y) / (-camera.x + this.circleX - mousePos.x) );
        if ((-camera.x + this.circleX ) >= mousePos.x ) this.aimingAngle+=Math.PI;

        this.x = this.circleX + Math.cos(this.aimingAngle)*this.radius;
        this.y = this.circleY - Math.sin(this.aimingAngle)*this.radius;
    }

    draw() {
        canvasCtx.fillStyle=this.crosshairColor;
        canvasCtx.fillRect(-camera.x + this.x,-camera.y + this.y,6,6);
    }

    setPosition( {x:x, y:y, width:width, height:height} ) {
        this.circleX = x + width/2;
        this.circleY = y + height/2;
    }

}