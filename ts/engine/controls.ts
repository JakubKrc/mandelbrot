let keys = [];

let pressedKeys:number[] = [];           //paci sa mi ako to cele funguje, len je to asi dost neefektivne
let waitForKeyUp:boolean[] = [];

function inicializeKeyboard():void {

    keys['up']=['w','W'];       //mozes mat viac znakov na jednu funkciu a zaroven to prehladne pouzit v kode, tesim sa
    keys['down']=['s','S'];
    keys['left']=['a',"A"];
    keys['right']=['d',"D"];
    keys['q']=['q',"Q"];
    keys['e']=['e',"E"];
    keys['x']=['x',"X"];
    keys['jump']=[' '];
    keys['menu']=['Delete','p',"P"];
    keys['fire']=['leftMouseButton'];
    keys['use']=['rightMouseButton'];
    keys['bla']=['middleMouseButton'];

    for (let key in keys) 
        for(let key2 in keys[key]){
            pressedKeys[keys[key][key2]] = 0;
            waitForKeyUp[keys[key][key2]] = false;
        }
    
    document.addEventListener("keydown", (evt) => pressedKeys[evt.key]++)
    document.addEventListener("keyup", 
        (evt) => {
            pressedKeys[evt.key] = 0;
            waitForKeyUp[evt.key] = false;
        }
    )

}

function keyPressed(keyPressed:[]) : boolean{
    for(let key in keyPressed) {
        if(pressedKeys [keyPressed[key]] == 0) continue;
        if(pressedKeys [keyPressed[key]] > 0 ) return true;    //mozno ani netreba vacsie ako nula a ++ to, asi relikt
    }
    return false;
}

function keyPressedWaitForKeyUp(keyPressed:[]) : boolean{      //toto zareaguje iba ked klavesu pustis a stlacis znova, problem v predchadzajucej verzii

    for(let key in keyPressed) {

        if(pressedKeys [keyPressed[key]] == 0) continue;

        if(pressedKeys [keyPressed[key]] > 0 && !waitForKeyUp[keyPressed[key]]) {
                
            pressedKeys [keyPressed[key]] = 0;
            waitForKeyUp[keyPressed[key]] = true;
            return true;

        }
        
    }

    return false;

}