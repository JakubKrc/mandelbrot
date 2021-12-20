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
    needFullscreenToRun = false;
    needMouseLockToRun = false;
    obj[0] = new playableObj(190, 40, 20, 20, true, false);
    obj[1] = new playableObj(70, 70, 50, 50, false, true);
    obj[2] = new playableObj(150, 150, 20, 20, false, true);
    obj[3] = new playableObj(0, 200, 1800, 20, false, true);
    obj[4] = new playableObj(100, 177, 20, 20, false, true);
    obj[5] = new playableObj(180, 130, 100, 20, false, true);
    setInterval(mainCalculate, 1000 / fps);
    mainDraw();
    eventWait(40, true);
    eventInitialize('obj[2].addVector(Math.PI/2, 0.23)', 40, 1, false, true);
    eventWait(40);
    eventInitialize('obj[2].addVector(3*Math.PI/2, 0.23)', 40, -3, false, true);
    eventWait(10, true);
    eventInitialize('obj[4].addVector(Math.PI, 0.23)', 40, 1, false, true);
    eventWait(10);
    eventInitialize('obj[4].addVector(2*Math.PI, 0.23)', 40, -3, false, true);
};
function mainCalculate() {
    if (keyPressedWaitForKeyUp(keys['menu']))
        mainInterval = !mainInterval;
    if (!mainInterval)
        return;
    if (keyPressed(keys['up']))
        obj[selectedObject].addVector(Math.PI / 2, 0.3);
    if (keyPressed(keys['down']))
        obj[selectedObject].addVector(3 * Math.PI / 2, 0.3);
    if (keyPressed(keys['left']))
        obj[selectedObject].addVector(Math.PI, 0.3);
    if (keyPressed(keys['right']))
        obj[selectedObject].addVector(2 * Math.PI, 0.3);
    obj[selectedObject].jump(keyPressed(keys['jump']), 40, 5);
    if (keyPressedWaitForKeyUp(keys['fire'])) {
        let x = obj.push(new playableObj(crosshair.x, crosshair.y, 6, 6, true, false));
        obj[x - 1].addVector(crosshair.aimingAngle, 8);
    }
    if (keyPressedWaitForKeyUp(keys['q']))
        selectedObject++;
    if (keyPressedWaitForKeyUp(keys['e']))
        selectedObject--;
    selectedObject = Math.max(0, Math.min(selectedObject, obj.length - 1));
    obj.forEach(obj => obj.collision = "0");
    obj.forEach(obj => obj.todo());
    for (let x = 0; x < obj.length; x++)
        for (let y = 0; y < obj.length; y++)
            if (x != y && obj[x].constructor.name == 'playableObj')
                if (obj[y].immovable)
                    if (obj[x].rigidCollision(obj[y]) == "bottom") {
                        obj[x].x += obj[y].moveXspeed;
                        obj[x].y += obj[y].moveYspeed;
                    }
    obj.forEach(obj => obj.move());
    crosshair.setPosition(obj[selectedObject]);
    crosshair.calculateCroshairDirectionToMouse();
    camera.followObject(obj[selectedObject]);
    camera.move();
    eventsRun();
}
function mainDraw() {
    canvasCtx.fillStyle = 'green';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    obj.forEach(obj => obj.draw());
    obj[selectedObject].draw("black");
    if (mouseInicialized) {
        canvasCtx.fillStyle = 'yellow';
        canvasCtx.fillRect(mousePos.x, mousePos.y, 6, 6);
    }
    crosshair.draw();
    fullscreenLockmouseMsg();
    requestAnimationFrame(mainDraw);
}
//# sourceMappingURL=game.js.map