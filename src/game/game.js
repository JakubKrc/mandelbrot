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
let mainImage = [];
let repeatStable = 60;
let boundariesStable = 0;
let colorOfCoordinates = 0;
window.onload = function () {
    document.getElementById("canvas").addEventListener("contextmenu", function (event) {
        event.preventDefault();
    });
    inicializeKeyboard();
    inicializeCanvas("canvas");
    inicializeMouse();
    mainImage = Array(canvas.width).fill(0).map(() => Array(canvas.height).fill(repeatStable));
    os.x = canvas.width / 2;
    os.y = canvas.height / 2;
    calculateMainImage();
    needFullscreenToRun = false;
    needMouseLockToRun = false;
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
    if (keyPressed(keys['use'])) {
        cCislo.real = (mousePos.x - os.x) / mierkaZvacsenia;
        cCislo.imaginary = (mousePos.y - os.y) / mierkaZvacsenia;
        vykresliEste = 0;
        calculateMainImage();
    }
    if (keyPressedWaitForKeyUp(keys['x'])) {
        axis = !axis;
        vykresliEste = 0;
    }
    canvas.addEventListener('mousemove', () => {
        document.getElementById('label').innerHTML = mainImage[Math.floor(mousePos.x)][Math.floor(mousePos.y)].toString();
    });
    if (keyPressedWaitForKeyUp(keys['c']))
        console.log(mainImage);
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
            if (mainImage[x][y] !== repeatStable) {
                canvasCtx.fillStyle = 'rgba(' + (12 + (3 * mainImage[x][y])).toString() + ',' + (12 + (3 * mainImage[x][y])).toString() + ',' + (60 + (5 * mainImage[x][y])).toString() + ',1)';
                canvasCtx.fillRect(x, y, 1, 1);
            }
    if (axis)
        drawAxis();
    fullscreenLockmouseMsg();
    //requestAnimationFrame(mainDraw);   //daky novy sposob vykreslovania na canvas. nemusis riesit fps ani sync s monitorom. rad som vyuzil
}
//# sourceMappingURL=game.js.map