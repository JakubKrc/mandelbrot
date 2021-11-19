let keys = [];
let pressedKeys = [];
let waitForKeyUp = [];
function inicializeKeyboard() {
    keys['up'] = ['w', 'W'];
    keys['down'] = ['s', 'S'];
    keys['left'] = ['a', "A"];
    keys['right'] = ['d', "D"];
    keys['q'] = ['q', "Q"];
    keys['e'] = ['e', "E"];
    keys['menu'] = ['Delete', 'p', "P"];
    keys['fire'] = ['leftMouseButton'];
    keys['use'] = ['rightMouseButton'];
    keys['bla'] = ['middleMouseButton'];
    for (let key in keys)
        for (let key2 in keys[key]) {
            pressedKeys[keys[key][key2]] = 0;
            waitForKeyUp[keys[key][key2]] = false;
        }
    document.addEventListener("keydown", (evt) => pressedKeys[evt.key]++);
    document.addEventListener("keyup", (evt) => {
        pressedKeys[evt.key] = 0;
        waitForKeyUp[evt.key] = false;
    });
}
function keyPressed(keyPressed) {
    for (let key in keyPressed) {
        if (pressedKeys[keyPressed[key]] == 0)
            continue;
        if (pressedKeys[keyPressed[key]] > 0)
            return true;
    }
    return false;
}
function keyPressedWaitForKeyUp(keyPressed) {
    for (let key in keyPressed) {
        if (pressedKeys[keyPressed[key]] == 0)
            continue;
        if (pressedKeys[keyPressed[key]] > 0 && !waitForKeyUp[keyPressed[key]]) {
            pressedKeys[keyPressed[key]] = 0;
            waitForKeyUp[keyPressed[key]] = true;
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=controls.js.map