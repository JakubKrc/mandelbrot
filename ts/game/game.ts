let fps = 15;
let mainInterval = true;

let hlavneCislo:complexImaginary = {
    imaginary : 0,
    real : 0
};
let cCislo:complexImaginary = {
    imaginary:0,
    real : 0
}

let mainImage : any;
let repeatStable = 150;
let boundariesStable = 0;;
let vykresliEste:number;

  
window.onload = function () {

    inicializeCanvas("canvas");

    mieraZoomu = 2;
    mierkaZvacsenia = 150;
    mainReset();

    document.addEventListener("contextmenu", function(event){
        event.preventDefault();
    });

    inicializeKeyboard();
    inicializeMouse();

    calculateMainImage();

    needFullscreenToRun = false;
    needMouseLockToRun = false;
            
    setInterval(mainCalculate ,1000/fps);       //toto bude treba prerobit, nejde to rovanko rychlo na vsetkych kompoch, je to na youtube
    setInterval(mainDraw ,1000/fps);        
    

}

type complexImaginary = {real:number,imaginary:number}; 

function mainCalculate():void {

    if( keyPressedWaitForKeyUp ( keys['menu'] ) )     //pauzovanie. velmi som spokojny s jednoduchostou. v prvej verzii kubohry sa to ukazalo ako
                                                        //prekvapivy problem dorobit
        mainInterval = !mainInterval;

    if (!mainInterval) return;                          //rozdelene vykreslovanie a pocitanie pohybu a vsetkeho. teraz sa nic nepohne,
                                                        //ale stale mozes obnovit obraz. vyhoda pri tvorbe menu, ako som zistil minule
    
    if(keyPressed(keys['fire'])) {
        hlavneCislo.real = (mousePos.x - os.x)/mierkaZvacsenia;
        hlavneCislo.imaginary = (mousePos.y - os.y)/mierkaZvacsenia;
        vykresliEste = 0;
    }

    if(keyPressed(keys['use'])){
        cCislo.real = (mousePos.x - os.x)/mierkaZvacsenia;
        cCislo.imaginary = (mousePos.y - os.y)/mierkaZvacsenia;
        vykresliEste = 0;
        calculateMainImage();
    }

    if(keyPressedWaitForKeyUp(keys['x'])) {
        axis=!axis;
        vykresliEste=0;
    }

    if(keyPressedWaitForKeyUp(keys['m'])) toggleLabel();

    canvas.addEventListener('mousemove', () => {
        
      //  document.getElementById('label').innerHTML = mainImage[Math.floor(mousePos.x)][Math.floor(mousePos.y)].toString();

    });
    
   // eventsRun();            //spravi krok v eventoch
    
}

function mainDraw(){

    if(!keyPressed(keys['fire']) && !keyPressed(keys['use']) && vykresliEste>1){ 
        return;
    }

    vykresliEste++;

    canvasCtx.fillStyle='black';
    canvasCtx.fillRect(0,0,canvas.width,canvas.height);

    canvasCtx.putImageData(mainImage, 0, 0);

    if(axis) drawAxis();

    fullscreenLockmouseMsg();  

    //requestAnimationFrame(mainDraw);   //daky novy sposob vykreslovania na canvas. nemusis riesit fps ani sync s monitorom. rad som vyuzil

}