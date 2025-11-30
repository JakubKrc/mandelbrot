window.onload = function () {

    inicializeCanvas("canvas");

    mainReset();

    document.addEventListener("contextmenu", function(event){
        event.preventDefault();
    });

    inicializeKeyboard();
    inicializeMouse();

    calculateMainImage();

    needFullscreenToRun = false;
    needMouseLockToRun = false;
            
    setInterval(mainCalculate ,1000/fps);  
    mainDraw();
    
    elementsButtons = document.querySelectorAll('#menuButtonToggle, #presetsButtonToggle');

    for (let i=0; i<5; i++) {
        const button = document.createElement('button');
        button.textContent = i.toString();
        button.addEventListener('click', () => {
            presetIn(i);
            document.querySelector('.container-menu .presetsMenu').classList.toggle('open');
        });
        document.querySelector('.container-menu .presetsMenu').appendChild(button);
    }

}

function mainCalculate():void {

    if( keyPressedWaitForKeyUp ( keys['menu'] ) )     //pauzovanie. velmi som spokojny s jednoduchostou. v prvej verzii kubohry sa to ukazalo ako
                                                        //prekvapivy problem dorobit
        mainInterval = !mainInterval;

    if (!mainInterval) return;                          //rozdelene vykreslovanie a pocitanie pohybu a vsetkeho. teraz sa nic nepohne,
                                                        //ale stale mozes obnovit obraz. vyhoda pri tvorbe menu, ako som zistil minule
    
    if(!isMenuOpen()){
        if(keyPressed(keys['use'])) {
            hlavneCislo.real = (mousePos.x - os.x)/activePreset.mierkaZvacsenia;
            hlavneCislo.imaginary = (mousePos.y - os.y)/activePreset.mierkaZvacsenia;
            vykresliEste = 0;
        }

        if(keyPressed(keys['fire'])){
            activePreset.cCislo.real = (mousePos.x - os.x)/activePreset.mierkaZvacsenia;
            activePreset.cCislo.imaginary = (mousePos.y - os.y)/activePreset.mierkaZvacsenia;
            vykresliEste = 0;
            calculateMainImage();
        }

        if(keyPressedWaitForKeyUp(keys['x'])) axis=!axis;
        if(keyPressedWaitForKeyUp(keys['t'])) drawPoints=!drawPoints;

        if(keyPressedWaitForKeyUp(keys['o'])) {
            presetOut();
        }
    }

    if(keyPressedWaitForKeyUp(keys['m'])) toggleMenu();
    if(keyPressedWaitForKeyUp(keys['p'])) toggleMenuPresets();
    if(keyPressedWaitForKeyUp(keys['v'])) toggleMenuValues();

    window.addEventListener('mousemove', (event) => {
        for (let i=0; i<elementsButtons.length; i++) {
            elementsButtons[i].style.opacity = 
                ( (event.clientY/window.innerHeight < 0.6) ? 0 : (event.clientY/window.innerHeight)*2 - 1.4 ).toString();
        }
    });
    
   // eventsRun();            //spravi krok v eventoch
    
}

function mainDraw(){

    canvasCtx.putImageData(mainImage, 0, 0);

    if(axis) drawAxis();

    if(drawPoints)
        itinerations = opakovaneVykreslenie(hlavneCislo, drawPoints)+1;

    updateValuesMenu();

    fullscreenLockmouseMsg();  

    requestAnimationFrame(mainDraw);   //daky novy sposob vykreslovania na canvas. nemusis riesit fps ani sync s monitorom. rad som vyuzil

}

function isMenuOpen() {
    if(document.querySelector('.container-menu .presetsMenu').classList.contains('open')||
        document.querySelector('.container-menu .mainMenu').classList.contains('open'))
        return true;
    return false;
}