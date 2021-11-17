let polomer = 20;	  	 
let uholMier = 0;
let uholMier2 = 0;
let rychlost = 3;

let kruhX:number ,kruhY: number;

let mainInterval = true;
let fps = 20;
        
window.onload = function ():void {

    inicializeKeyboard();
    inicializeCanvas("canvas");
    inicializeMouse();
    
    kruhX = canvas.width/3;
    kruhY = canvas.height/3;

    setInterval(mainCalculate, 1000/fps);
    mainDraw();

}

function mainDraw():void {
    
    canvasCtx.fillStyle='green';
    canvasCtx.fillRect(0,0,canvas.width,canvas.height)		
    
    canvasCtx.fillStyle='red';
    for(let uhol = 0; uhol<Math.PI*2; uhol+=Math.PI/60){
        canvasCtx.fillRect(kruhX + Math.cos(uhol)*polomer,kruhY + Math.sin(uhol)*polomer,1,1);	
    }
    
    canvasCtx.fillStyle='blue';
    canvasCtx.fillRect(kruhX- 3 + Math.cos(uholMier)*polomer,kruhY - 3 + Math.sin(uholMier)*polomer,6,6);	
    
    canvasCtx.fillStyle='orange';
    canvasCtx.fillRect(kruhX- 3 + Math.cos(uholMier2)*polomer,kruhY - 3 + Math.sin(uholMier2)*polomer,6,6);	
    
    if(mouseInicialized){
        canvasCtx.fillStyle='yellow';
        canvasCtx.fillRect(mousePos.x ,mousePos.y,6,6);	
    }
    
    if (canvasMessageFullscreen) canvasMsgSimple("Press ESC to get back to browser.");
    if (canvasMessagePointer) canvasMsgSimple("Press ESC to get back to browser.");

    fullscreenLockmouseMsg();

    requestAnimationFrame(mainDraw);
    
}

function mainCalculate():void{

    if( keyPressedWaitForKeyUp ( keys['menu'] ) )
        mainInterval = !mainInterval;

    if (!mainInterval) return;
    
    if(needFullscreenToRun && !fullscreenActive) return;
    if(needMouseLockToRun && !canvasPointerLock) return;
    
    uholMier2 = Math.atan (  (kruhY - mousePos.y) / (kruhX - mousePos.x) )
    if ((kruhX ) >= mousePos.x ) uholMier2+=Math.PI;
    
    if(keyPressed(keys['right'])) {uholMier+=Math.PI/40;}
    if(keyPressed(keys['left'])) {uholMier-=Math.PI/40;}
    if(keyPressed(keys['up'])) {kruhX += Math.cos(uholMier) * rychlost; kruhY += Math.sin(uholMier) * rychlost}
    if(keyPressed(keys['down'])) {kruhX-= Math.cos(uholMier) * rychlost;  kruhY -= Math.sin(uholMier) * rychlost}

    canvasMessageFullscreen = false;
    canvasMessagePointer = false;
    runEvents();
            
}