let gravity = 0.6;
let obj:any = [];
let selectedObject = 0;
let crosshair = new crosshairClass(35,"orange");
let camera = new cameraClass(0,0);

let fps = 60;
let mainInterval = true;
  
window.onload = function () {

    inicializeKeyboard();
    inicializeCanvas("canvas");
    inicializeMouse();

    needFullscreenToRun = false;   // toto su globalne premenne, ked to bude hra, tak to bude vyzadovat fullscreen a lockmouse
    needMouseLockToRun = false;     // tiez neviem uplne preco, ale tie sa uplne odporucaju nepouzivat
                                    // lepsie vytvorit triedu gameEngine? kde to bude vsetko?
    
    obj[0] = new playableObj(190,40,20,20, true, false);
    obj[1] = new playableObj(70,70,50,50, false, true);
    obj[2] = new playableObj(150,150,20,20, false, true);
    obj[3] = new playableObj(0,200,1800,20, false, true);
    obj[4] = new playableObj(100,177,20,20, false, true);
    obj[5] = new playableObj(180,130,100,20, false, true);
            
    setInterval(mainCalculate ,1000/fps);       //toto bude treba prerobit, nejde to rovanko rychlo na vsetkych kompoch, je to na youtube
    mainDraw();        

    eventWait(40, true);        // mnou vytvorene scriptovanie vlastne asi, v stringu to je aby sa to dalo ulozit do databazy
    eventInitialize('obj[2].addVector(Math.PI/2, 0.23)',40,1,false,true);//a spustam to cez eval(), co sa neodporuca
    eventWait(40);                                                        //ako toto spravit inac???????????? pozri events.ts
    eventInitialize('obj[2].addVector(3*Math.PI/2, 0.23)',40,-3,false,true);//ale funguje to dobre, aj save load aj to robi to co ma. este odstranit
                                                                            //nutnost rucneho pisania poradia si tusim trufam
    eventWait(10, true);                                                    //su to tie pohybujuce sa plosinky
    eventInitialize('obj[4].addVector(Math.PI, 0.23)',40,1,false,true);
    eventWait(10);
    eventInitialize('obj[4].addVector(2*Math.PI, 0.23)',40,-3,false,true);

}

function mainCalculate():void {

    if( keyPressedWaitForKeyUp ( keys['menu'] ) )     //pauzovanie. velmi som spokojny s jednoduchostou. v prvej verzii kubohry sa to ukazalo ako
                                                        //prekvapivy problem dorobit
        mainInterval = !mainInterval;

    if (!mainInterval) return;                          //rozdelene vykreslovanie a pocitanie pohybu a vsetkeho. teraz sa nic nepohne,
                                                        //ale stale mozes obnovit obraz. vyhoda pri tvorbe menu, ako som zistil minule

    if(keyPressed(keys['up'])) obj[selectedObject].addVector(Math.PI/2, 0.3);      //cacane, takyto zapis sa mi paci. co sa skryva podtymi funkciami je uz
    if(keyPressed(keys['down'])) obj[selectedObject].addVector(3*Math.PI/2, 0.3);   //asi horsie. controls.ts a physics.ts
    if(keyPressed(keys['left'])) obj[selectedObject].addVector(Math.PI, 0.3);
    if(keyPressed(keys['right'])) obj[selectedObject].addVector(2*Math.PI, 0.3);
    
    obj[selectedObject].jump(keyPressed(keys['jump']),40,5)   //jump je tiez pochybny, hlavne by som chcel mat rovnaku funkciu pre hraca aj prisery
                                                                //kedze hra ma obsahovat moznost niektre z nich ovladat, ako napr v Abe's Odyssea
    if(keyPressedWaitForKeyUp(keys['fire'])) {
        let x = obj.push(new playableObj(crosshair.x, crosshair.y,6,6, true, false));  //totok bude spojene s gifkom a nie velkostou stvorca
        obj[x-1].addVector(crosshair.aimingAngle, 8);                                  //tiez som chcel mat zvlast projektil class,
    }                                                                                  //a vobec tie class sa mi moc nepacia, neviem to v tom
                                                                                       //zmysluplne rozdelit. rozmyslam na to skoro uplne ich 
    if(keyPressedWaitForKeyUp(keys['q'])) selectedObject++                             //vypustit a rozdelit data a funkcie. vyhoda aj pri savovani
    if(keyPressedWaitForKeyUp(keys['e'])) selectedObject--
    selectedObject = Math.max(0, Math.min(selectedObject, obj.length - 1))   //moznost ovladat iny objekt, to v tej hre chcem mat, toto je len test, ktory to zlbne
     
    obj.forEach (obj => obj.collision = "0");  //zakazdym nanovo cisti a pocita kolizie. neviem ci to tak musi byt
    obj.forEach (obj => obj.todo());    //tu sa skryva co ma ktora class urobit. kazda ma svoju verziu todo, myslim ze sa to vola pretazenie pri dedicnosti tried. napr sprite sa iba vykresli, plosinka uz je rigidObject, cize pocita fyziku, a priserka aj AI
 
    for (let x=0; x<obj.length; x++)   //!!!!!????? toto je kktina, ktoru som vlastne ani nedorobil. tuna riesi, co sa s cim stretava a potom riesi koliziu. neda sa to elegantnejsie? urcite ano, len som to poriadne neskusal, takto to akotak funguje
        for (let y=0; y < obj.length; y++)
            if(x!=y && obj[x].constructor.name == 'playableObj')
                if (obj[y].immovable)
                    if (obj[x].rigidCollision ( obj[y] ) == "bottom"){
                        obj[x].x += obj[y].moveXspeed;
                        obj[x].y += obj[y].moveYspeed;
                    }

    obj.forEach (obj => obj.move());   // ked ma vypocitane kolizie, tak usudi, s cim vobec nieco pohne, neni to dobre.

    crosshair.setPosition (obj[selectedObject]);    //zameriavatko sa meni automaticky podla toho, ktory objekt ovladas. daktore priserky ho ani nebudu mat
    crosshair.calculateCroshairDirectionToMouse();  //momentalne funguje k mojej spokojnosti

    camera.followObject (obj[selectedObject]);    //este neni dorobene. kamera nestiha a ma fyziku ako vsetko ostatne, co trochu blbne
    camera.move();

    eventsRun();            //spravi krok v eventoch
    
}

function mainDraw(){

    canvasCtx.fillStyle='green';
    canvasCtx.fillRect(0,0,canvas.width,canvas.height)		

    obj.forEach (obj => obj.draw())
    obj[selectedObject].draw("black");  //tebou ovladany objekt je cierny, ak neni v kolizii, kedy je cerveny. samozrejme len pre testovne ucely

    if(mouseInicialized){
        canvasCtx.fillStyle='yellow';
        canvasCtx.fillRect(mousePos.x ,mousePos.y,6,6);	//kresli mysku
    }

    crosshair.draw();

    fullscreenLockmouseMsg();   // ta upozornuje, ked ta to nuti zalokovat mys a dat do fulscreenu. teraz je to vypnute, ale ked to bude
                                //vonku, tak sa to mas hrat jak na 486ke, nie v prehliadaci. v tom to je len kvoli dostupnosti.
                                //ale moznost vykreslovat sirokouhlo to mat bude, hoci asi to nebude standardne nastavenie, neviem este
                                //vlasne aj toto sa bude dat vypnut, ale vynada ti to pri tom
    requestAnimationFrame(mainDraw);   //daky novy sposob vykreslovania na canvas. nemusis riesit fps ani sync s monitorom. rad som vyuzil

}