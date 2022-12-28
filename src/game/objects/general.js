class basicObj {
    constructor(x, y, width, height) {
        this.collision = "0";
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = this.constructor.name; //kvoli inicializacii objektu pri nacitani z databazy. zas to riesim s eval().nie len pre toto
    } //ma laka vysrat sa na objekty. este aj kvoli dedicnosti a tomu, ze mas na childoch zavesene
    //funkcie, ktore aj tak nepouzijes. Irituje ma to no. Skusal som aj ten composition pristup
    todo() { }
    ; //ale to neni dobre integrovane do jazyka a blbo sa to zapisuje a ma to sialeny pristup k premennym.
}
class drawObj extends basicObj {
    draw(color = "blue") {
        if (this.collision != "0")
            color = "red"; //saskovanie kvoli testovaniu, bude to kreslit .png subory. Ale aj stvorce ako kolizie vramci editoru
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