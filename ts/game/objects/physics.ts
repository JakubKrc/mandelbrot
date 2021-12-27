class rigidObj extends overlapObj {    // toto je srdce enginu a samozrejme to co najviac blbne. budem to muset prerobit od zaciatku.
                                        //dalo by sa to zdokonalit, ale nedorobim tam ovplyvnovanie objektov navzajom, prenansanie sily medzi nimi asi
                                        //a interagovanie viacerych objektov. napr. ze jednu bednu potlacis, ale dve uz nie ked budu pri sebe
    moveYspeed:number; moveXspeed:number;//resp. aj ano, ak budu dost lahke. este treba dorobit frikcie a odrazivost. Vodu. A vybuchy, resp.
    applyGravity:boolean;                   //vektory kde sa bude sirit sila z jedneho bodu do vsetkych stran. Vsetko iba zo stvorcami a obdlznikmi. 
    immovable:boolean;                      //na nic ine si ani nahodou netrufam. Ani sikme plochy tam asi nebudu, hoci to asi skusim.

    constructor(x:number, y:number, width:number, height:number, applyGravity: boolean, immovable:boolean){
        super(x, y, width, height);
        this.moveYspeed = 0;
        this.moveXspeed = 0;
        this.applyGravity = applyGravity;
        this.immovable = immovable;
    }

    addVector(angle:number, force:number){
        this.moveXspeed += Math.cos(angle) * force;
        this.moveYspeed -= Math.sin(angle) * force;                        
    }

    returnVector(){

        let angle = Math.acos (this.moveXspeed);

        if (this.moveYspeed > 0) angle = Math.PI + (Math.PI - angle);

        return {

            angle : angle,
            force : this.moveXspeed / Math.cos(angle) 
        }

    }

    setResistance (moveResistanceX:number, moveResistanceY:number){

        if(this.moveYspeed<0)
            this.moveYspeed = Math.min(0, this.moveYspeed += moveResistanceY)

        if(this.moveYspeed>0)
            this.moveYspeed = Math.max(0, this.moveYspeed -= moveResistanceY)
    
        if(this.moveXspeed<0)
            this.moveXspeed = Math.min(0, this.moveXspeed += moveResistanceX)

        if(this.moveXspeed>0)
            this.moveXspeed = Math.max(0, this.moveXspeed -= moveResistanceX)

    }

    move() {

        this.x = Math.round (this.x+this.moveXspeed);
        this.y = Math.round (this.y+this.moveYspeed);
            
    }

    checkOverlapWithSpeed(  x : number, y : number, width : number, height : number ) : boolean{
            
        if ( (this.x + this.moveXspeed < x + width) && (this.x + this.moveXspeed + this.width > x) && 
            (this.y + this.moveYspeed< y + height) && (this.y + this.moveYspeed + this.height > y)){
                this.collision = "dsf";
                return true;
            }

        return false;
                
    }

    whichSideIsOverlappingSooner( {x : x, y : y, width : width, height : height} ) : string{

        let howDeepX:number;
        let howDeepY:number;

        if ( this.moveXspeed < 0 && this.moveYspeed < 0 ){
            howDeepX = this.x + this.moveXspeed - (x + width);
            howDeepY = this.y + this.moveYspeed - (y + height);

            if (howDeepX/this.moveXspeed < howDeepY/this.moveYspeed ) return this.collision='left';
            if (howDeepX/this.moveXspeed > howDeepY/this.moveYspeed ) return this.collision='top';
            return 'topleft';

        }

        if ( this.moveXspeed < 0 && this.moveYspeed > 0 ){
            howDeepX = this.x + this.moveXspeed - (x + width);
            howDeepY = this.y + this.moveYspeed + this.height - y;

            if (howDeepX/this.moveXspeed < howDeepY/this.moveYspeed ) return this.collision='left';
            if (howDeepX/this.moveXspeed > howDeepY/this.moveYspeed ) return this.collision='bottom';
            return 'bottomleft';

        }

        if ( this.moveXspeed > 0 && this.moveYspeed < 0 ){
            howDeepX = this.x + this.moveXspeed + this.width - x;
            howDeepY = this.y + this.moveYspeed - (y + height);

            if (howDeepX/this.moveXspeed < howDeepY/this.moveYspeed ) return this.collision='right';
            if (howDeepX/this.moveXspeed > howDeepY/this.moveYspeed ) return this.collision='top';
            return 'topright';

        }

        if ( this.moveXspeed > 0 && this.moveYspeed > 0 ){
            howDeepX = this.x + this.moveXspeed + this.width - x;
            howDeepY = this.y + this.moveYspeed + this.height - y;

            if (howDeepX/this.moveXspeed < howDeepY/this.moveYspeed ) return this.collision='right';
            if (howDeepX/this.moveXspeed > howDeepY/this.moveYspeed ) return this.collision='bottom';
            return 'bottomright';

        }

    }

    rigidCollision( {x : x, y : y, width : width, height : height} ){

        if( !this.checkOverlapWithSpeed (x,y,width, height) ) return;

        if(this.moveYspeed==0) {

            if (this.moveXspeed > 0 || (this.moveXspeed==0 && this.x+this.width > x && this.x+this.width < x + width) ){
                this.x = x - this.width;    
                this.collision = "right";       
            }
            if (this.moveXspeed < 0 || (this.moveYspeed==0 && this.x > x && this.x < x + width)){
                this.x = x + width; 
                this.collision = "left";       
            }

            this.moveXspeed = 0;

        }

        if(this.moveXspeed==0) {
            
            if (this.moveYspeed > 0){
                this.y = y - this.height;
                this.collision = "bottom";       
            }
            if (this.moveYspeed < 0){
                this.y = y + height;
                this.collision = "top";       
            }
            this.moveYspeed = 0;

        }
        
        this.whichSideIsOverlappingSooner( {x, y, width, height} );
        switch (this.collision) {
            case 'top': this.y = y + height;this.moveYspeed = 0;
                break;
            case 'bottom': this.y = y - this.height;this.moveYspeed = 0;
                break;
            case 'right': this.x = x - this.width;this.moveXspeed = 0;
                break;
            case 'left': this.x = x + width;this.moveXspeed = 0;
                break;
            default:
                this.moveXspeed = 0;
                this.moveYspeed = 0;
        }

        return this.collision;

    }

    todo(){
        if (this.applyGravity) 
            this.addVector(3*Math.PI/2, gravity);
        this.setResistance(0.20,0.20);
    }

}