class basicObj{

    x:number;y:number;
    width:number;height:number;
    collision = "0";
    type:string;

    constructor (x:number, y:number, width:number, height:number){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = this.constructor.name;
    }

    todo(){};

}

class drawObj extends basicObj{

    draw(color = "blue"){
            
        if (this.collision!="0") color = "red";
        canvasCtx.fillStyle=color;
        canvasCtx.fillRect(-camera.x + this.x,-camera.y + this.y,this.width,this.height);
        
    }
    
}

class overlapObj extends drawObj{

    checkOverlap( x : number, y : number, width : number, height : number ) : boolean{
            
        if ( (this.x < x + width) && (this.x + this.width > x) && 
            (this.y < y + height) && (this.y + this.height > y)){
                this.collision = "sdf";
                return true;
            }

        return false;
                
    }

}