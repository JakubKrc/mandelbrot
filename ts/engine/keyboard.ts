let keys = [];

let pressedKeys:number[] = [];
let waitForKeyUp:boolean[] = [];

function inicializeKeyboard():void {

    keys['up']=['w','W'];
    keys['down']=['s','S'];
    keys['left']=['a',"A"];
    keys['right']=['d',"D"];
    keys['menu']=['Delete','p',"P"];

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
        if(pressedKeys [keyPressed[key]] > 0 ) return true; 
    }
    return false;
}

function keyPressedWaitForKeyUp(keyPressed:[]) : boolean{

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