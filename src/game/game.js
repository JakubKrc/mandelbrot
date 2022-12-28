let gravity = 0.6;
let obj = [];
let selectedObject = 0;
let crosshair = new crosshairClass(35, "orange");
let camera = new cameraClass(0, 0);
let fps = 60;
let mainInterval = true;
window.onload = function () {
    inicializeKeyboard();
    inicializeCanvas("canvas");
    inicializeMouse();
    needFullscreenToRun = false; // toto su globalne premenne, ked to bude hra, tak to bude vyzadovat fullscreen a lockmouse
    needMouseLockToRun = false; // tiez neviem uplne preco, ale tie sa uplne odporucaju nepouzivat
    // lepsie vytvorit triedu gameEngine? kde to bude vsetko?
    setInterval(mainCalculate, 1000 / fps); //toto bude treba prerobit, nejde to rovanko rychlo na vsetkych kompoch, je to na youtube
    mainDraw();
};
function mainCalculate() {
    if (keyPressedWaitForKeyUp(keys['menu'])) //pauzovanie. velmi som spokojny s jednoduchostou. v prvej verzii kubohry sa to ukazalo ako
        //prekvapivy problem dorobit
        mainInterval = !mainInterval;
    if (!mainInterval)
        return; //rozdelene vykreslovanie a pocitanie pohybu a vsetkeho. teraz sa nic nepohne,
    //ale stale mozes obnovit obraz. vyhoda pri tvorbe menu, ako som zistil minule
    /* if(keyPressed(keys['up'])) obj[selectedObject].addVector(Math.PI/2, 0.3);      //cacane, takyto zapis sa mi paci. co sa skryva podtymi funkciami je uz
     if(keyPressed(keys['down'])) obj[selectedObject].addVector(3*Math.PI/2, 0.3);   //asi horsie. controls.ts a physics.ts
     if(keyPressed(keys['left'])) obj[selectedObject].addVector(Math.PI, 0.3);
     if(keyPressed(keys['right'])) obj[selectedObject].addVector(2*Math.PI, 0.3);*/
    /*if(keyPressedWaitForKeyUp(keys['fire'])) {
        let x = obj.push(new playableObj(crosshair.x, crosshair.y,6,6, true, false));  //totok bude spojene s gifkom a nie velkostou stvorca
        obj[x-1].addVector(crosshair.aimingAngle, 8);                                  //tiez som chcel mat zvlast projektil class,
    }                                                                                  //a vobec tie class sa mi moc nepacia, neviem to v tom
                                                                                       //zmysluplne rozdelit. rozmyslam na to skoro uplne ich
    if(keyPressedWaitForKeyUp(keys['q'])) selectedObject++                             //vypustit a rozdelit data a funkcie. vyhoda aj pri savovani
    if(keyPressedWaitForKeyUp(keys['e'])) selectedObject--
    selectedObject = Math.max(0, Math.min(selectedObject, obj.length - 1)) */ //moznost ovladat iny objekt, to v tej hre chcem mat, toto je len test, ktory to zlbne
    eventsRun(); //spravi krok v eventoch
}
function mainDraw() {
    canvasCtx.fillStyle = 'green';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    if (mouseInicialized) {
        canvasCtx.fillStyle = 'yellow';
        canvasCtx.fillRect(mousePos.x, mousePos.y, 6, 6); //kresli mysku
    }
    fullscreenLockmouseMsg(); // ta upozornuje, ked ta to nuti zalokovat mys a dat do fulscreenu. teraz je to vypnute, ale ked to bude
    //vonku, tak sa to mas hrat jak na 486ke, nie v prehliadaci. v tom to je len kvoli dostupnosti.
    //ale moznost vykreslovat sirokouhlo to mat bude, hoci asi to nebude standardne nastavenie, neviem este
    //vlasne aj toto sa bude dat vypnut, ale vynada ti to pri tom
    requestAnimationFrame(mainDraw); //daky novy sposob vykreslovania na canvas. nemusis riesit fps ani sync s monitorom. rad som vyuzil
}
//# sourceMappingURL=game.js.map