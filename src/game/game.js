let gravity = 0.6;
let obj = [];
let selectedObject = 0;
let fps = 15;
let mainInterval = true;
let hlavneCislo = {
    imaginary: 0,
    real: 0
};
let cCislo = {
    imaginary: 0,
    real: 0
};
let mierkaZvacsenia = 300;
let os = {
    x: 0,
    y: 0
};
let hlavnyImage = [];
let drawAxis = true;
let repeatStable = 10;
let boundariesStable = 0.02;
window.onload = function () {
    document.getElementById("canvas").addEventListener("contextmenu", function (event) {
        event.preventDefault();
    });
    inicializeKeyboard();
    inicializeCanvas("canvas");
    inicializeMouse();
    for (let i = 0; i < canvas.width; i++) {
        hlavnyImage[i] = new Array();
    }
    for (let x = 0; x < canvas.width; x += 1)
        for (let y = 0; y < canvas.height; y += 1)
            hlavnyImage[x][y] = 'black';
    os.x = canvas.width / 2;
    os.y = canvas.height / 2;
    let hlupe = 0;
    for (let x = -2; x < 2; x += 0.01)
        for (let y = -2; y < 2; y += 0.01) {
            hlupe = isStable({ real: x, imaginary: y });
            if (hlupe < repeatStable)
                hlavnyImage[Math.round(os.x + x * mierkaZvacsenia)][Math.round(os.y + y * mierkaZvacsenia)] = 'rgba(' + 50 + ',' + 50 + ',' + (50 + (hlupe * 15)) + ',1)';
            else
                hlavnyImage[Math.round(os.x + x * mierkaZvacsenia)][Math.round(os.y + y * mierkaZvacsenia)] = 'black';
        }
    needFullscreenToRun = false; // toto su globalne premenne, ked to bude hra, tak to bude vyzadovat fullscreen a lockmouse
    needMouseLockToRun = false; // tiez neviem uplne preco, ale tie sa uplne odporucaju nepouzivat
    // lepsie vytvorit triedu gameEngine? kde to bude vsetko?
    setInterval(mainCalculate, 1000 / fps); //toto bude treba prerobit, nejde to rovanko rychlo na vsetkych kompoch, je to na youtube
    setInterval(mainDraw, 1000 / fps);
};
function squareComplexImaginary(z) {
    return { real: z.real * z.real - z.imaginary * z.imaginary,
        imaginary: 2 * z.real * z.imaginary };
}
function addComplexImaginary(x, y) {
    return { real: x.real + y.real, imaginary: x.imaginary + y.imaginary };
}
function mandel(z, c) {
    return addComplexImaginary(squareComplexImaginary(z), c);
}
/*function isStable(z:complexImaginary):number{
    let docasne:complexImaginary = {
        real:z.real,
        imaginary:z.imaginary
    }

    let i=0;
    for(i=0; i<10; i++){
        if(docasne.real < -2 || docasne.real > 2 || docasne.imaginary < -2 || docasne.imaginary > 2)
            return i;
        docasne = mandel(docasne, cCislo);
    }

    return i;
}*/
function mainCalculate() {
    if (keyPressedWaitForKeyUp(keys['menu'])) //pauzovanie. velmi som spokojny s jednoduchostou. v prvej verzii kubohry sa to ukazalo ako
        //prekvapivy problem dorobit
        mainInterval = !mainInterval;
    if (!mainInterval)
        return; //rozdelene vykreslovanie a pocitanie pohybu a vsetkeho. teraz sa nic nepohne,
    //ale stale mozes obnovit obraz. vyhoda pri tvorbe menu, ako som zistil minule
    if (keyPressed(keys['fire'])) {
        hlavneCislo.real = (mousePos.x - os.x) / mierkaZvacsenia;
        hlavneCislo.imaginary = (mousePos.y - os.y) / mierkaZvacsenia;
        vykresliEste = 0;
    }
    else {
        hlavneCislo.real = 0;
        hlavneCislo.imaginary = 0;
    }
    if (keyPressed(keys['use'])) {
        cCislo.real = (mousePos.x - os.x) / mierkaZvacsenia;
        cCislo.imaginary = (mousePos.y - os.y) / mierkaZvacsenia;
        vykresliEste = 0;
        /*   for(let x=-2;x<2;x+=0.01)
               for(let y=-2;y<2;y+=0.01)
                       hlavnyImage[Math.round(os.x + x * mierkaZvacsenia)][Math.round(os.y + y * mierkaZvacsenia)] = false;*/
        let hlupe = 0;
        for (let x = -2; x < 2; x += 0.01)
            for (let y = -2; y < 2; y += 0.01) {
                hlupe = isStable({ real: x, imaginary: y });
                if (hlupe < repeatStable)
                    hlavnyImage[Math.round(os.x + x * mierkaZvacsenia)][Math.round(os.y + y * mierkaZvacsenia)] = 'rgba(' + 50 + ',' + 50 + ',' + (50 + (hlupe * 15)) + ',1)';
                else
                    hlavnyImage[Math.round(os.x + x * mierkaZvacsenia)][Math.round(os.y + y * mierkaZvacsenia)] = 'black';
            }
    }
    if (keyPressedWaitForKeyUp(keys['x'])) {
        drawAxis = !drawAxis;
        vykresliEste = 0;
    }
    // eventsRun();            //spravi krok v eventoch
}
let vykresliEste = 0;
function mainDraw() {
    if (!keyPressed(keys['fire']) && !keyPressed(keys['use']) && vykresliEste > 1) {
        return;
    }
    vykresliEste++;
    canvasCtx.fillStyle = 'black';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < canvas.width; x += 1)
        for (let y = 0; y < canvas.height; y += 1)
            if (hlavnyImage[x][y] !== 'black') {
                canvasCtx.fillStyle = hlavnyImage[x][y];
                canvasCtx.fillRect(x, y, 3, 3);
            }
    /*  for(let x=-2;x<2;x+=0.01)
               for(let y=-2;y<2;y+=0.01){
                   let hlupe = isStable({real:x,imaginary:y});
                   if (hlupe < repeatStable){
                       canvasCtx.fillStyle='rgba('+50+','+50+','+(50+(hlupe*15))+',1)';
                       canvasCtx.fillRect(Math.round(os.x + x * mierkaZvacsenia),Math.round(os.y + y * mierkaZvacsenia),3,3);
                   }
               }*/
    if (drawAxis) {
        canvasCtx.fillStyle = 'red';
        canvasCtx.fillRect(0, os.y, canvas.width, canvas.height / 400);
        canvasCtx.fillRect(os.x, 0, canvas.width / 400, canvas.height);
    }
    if (hlavneCislo.real != 0 && hlavneCislo.imaginary != 0)
        opakovaneVykreslenie(hlavneCislo);
    fullscreenLockmouseMsg();
    //requestAnimationFrame(mainDraw);   //daky novy sposob vykreslovania na canvas. nemusis riesit fps ani sync s monitorom. rad som vyuzil
}
//# sourceMappingURL=game.js.map