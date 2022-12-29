let gravity = 0.6;
let obj:any = [];
let selectedObject = 0;

let fps = 5;
let mainInterval = true;

let hlavneCislo:complexImaginary = {
    imaginary : 0,
    real : 0
};
let cCislo:complexImaginary= {
    imaginary:0,
    real : 0
}

let mierkaZvacsenia = 150;
let os = {
    x: 0,
    y: 0
};

let hlavnyImage = [];
  
window.onload = function () {

    document.getElementById("canvas").addEventListener("contextmenu", function(event){
        event.preventDefault();
    });

    inicializeKeyboard();
    inicializeCanvas("canvas");
    inicializeMouse();

    for(let i=0;i<canvas.width;i++){
        hlavnyImage[i] = new Array();
    }

    os.x = canvas.width/2;
    os.y = canvas.height/2;

    for(let x=-2;x<2;x+=0.01)
            for(let y=-2;y<2;y+=0.01)
                if (isStable({real:x,imaginary:y}))
                    hlavnyImage[Math.round(os.x + x * mierkaZvacsenia)][Math.round(os.y + y * mierkaZvacsenia)] = true;

    needFullscreenToRun = false;   // toto su globalne premenne, ked to bude hra, tak to bude vyzadovat fullscreen a lockmouse
    needMouseLockToRun = false;     // tiez neviem uplne preco, ale tie sa uplne odporucaju nepouzivat
                                    // lepsie vytvorit triedu gameEngine? kde to bude vsetko?
            
    setInterval(mainCalculate ,1000/fps);       //toto bude treba prerobit, nejde to rovanko rychlo na vsetkych kompoch, je to na youtube
    setInterval(mainDraw ,1000/fps);         

}

type complexImaginary = {real:number,imaginary:number};

function squareComplexImaginary(z:complexImaginary){
    return {real : z.real * z.real - z.imaginary * z.imaginary,
            imaginary : 2*z.real*z.imaginary}
}

function addComplexImaginary(x:complexImaginary,y:complexImaginary){
    return {real: x.real+y.real, imaginary: x.imaginary+y.imaginary};
}

function mandel(z:complexImaginary, c:complexImaginary):complexImaginary{
    return addComplexImaginary (squareComplexImaginary(z), c);
}

function isStable(z:complexImaginary):boolean{
    let docasne:complexImaginary = {
        real:z.real,
        imaginary:z.imaginary
    }

    for(let i=0; i<10; i++){
        if(docasne.real < -2 || docasne.real > 2 || docasne.imaginary < -2 || docasne.imaginary > 2)
            return false;
        docasne = mandel(docasne, cCislo);
    }

    return true;
}

function opakovaneVykreslenie (z:complexImaginary){
    let docasne:complexImaginary = {
        real:z.real,
        imaginary:z.imaginary
    }

    canvasCtx.beginPath();
    canvasCtx.moveTo(os.x + docasne.real * mierkaZvacsenia,os.y + docasne.imaginary * mierkaZvacsenia);

    for(let i=0; i<13; i++){
        canvasCtx.fillRect(os.x + docasne.real * mierkaZvacsenia,os.y + docasne.imaginary * mierkaZvacsenia ,canvas.width/80, canvas.height/80);
        docasne = mandel(docasne, cCislo);
        canvasCtx.lineTo(os.x + docasne.real * mierkaZvacsenia,os.y + docasne.imaginary * mierkaZvacsenia);
    }

    canvasCtx.stroke();


}

function mainCalculate():void {

    if( keyPressedWaitForKeyUp ( keys['menu'] ) )     //pauzovanie. velmi som spokojny s jednoduchostou. v prvej verzii kubohry sa to ukazalo ako
                                                        //prekvapivy problem dorobit
        mainInterval = !mainInterval;

    if (!mainInterval) return;                          //rozdelene vykreslovanie a pocitanie pohybu a vsetkeho. teraz sa nic nepohne,
                                                        //ale stale mozes obnovit obraz. vyhoda pri tvorbe menu, ako som zistil minule
    
    if(keyPressed(keys['fire'])) {
        hlavneCislo.real = (mousePos.x - os.x)/mierkaZvacsenia;
        hlavneCislo.imaginary = (mousePos.y - os.y)/mierkaZvacsenia;
    } else {
        hlavneCislo.real = 0;
        hlavneCislo.imaginary = 0;
    }

    if(keyPressed(keys['use'])){
        cCislo.real = (mousePos.x - os.x)/mierkaZvacsenia;
        cCislo.imaginary = (mousePos.y - os.y)/mierkaZvacsenia;
        for(let x=-2;x<2;x+=0.01)
            for(let y=-2;y<2;y+=0.01)
                    hlavnyImage[Math.round(os.x + x * mierkaZvacsenia)][Math.round(os.y + y * mierkaZvacsenia)] = false;
        for(let x=-2;x<2;x+=0.01)
            for(let y=-2;y<2;y+=0.01)
                if (isStable({real:x,imaginary:y}))
                    hlavnyImage[Math.round(os.x + x * mierkaZvacsenia)][Math.round(os.y + y * mierkaZvacsenia)] = true;
    }
    
   // eventsRun();            //spravi krok v eventoch
    
}

function mainDraw(){

    canvasCtx.fillStyle='green';
    canvasCtx.fillRect(0,0,canvas.width,canvas.height);

    canvasCtx.fillStyle='orange';
    for(let x=0;x<canvas.width;x+=1)
        for(let y=0;y<canvas.height;y+=1)
            if (hlavnyImage[x][y])
                canvasCtx.fillRect(x,y,2, 2);

    canvasCtx.fillStyle='blue';
    canvasCtx.fillRect(0, os.y , canvas.width , canvas.height/200);
    canvasCtx.fillRect(os.x, 0 , canvas.width/200, canvas.height);

    if(hlavneCislo.real!=0 && hlavneCislo.imaginary!=0){
        canvasCtx.fillStyle='red';
        opakovaneVykreslenie(hlavneCislo);
    }

    if(mouseInicialized){
        canvasCtx.fillStyle='yellow';
        canvasCtx.fillRect(mousePos.x ,mousePos.y,6,6);
    }

    fullscreenLockmouseMsg();  

    //requestAnimationFrame(mainDraw);   //daky novy sposob vykreslovania na canvas. nemusis riesit fps ani sync s monitorom. rad som vyuzil

}