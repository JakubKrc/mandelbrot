let polomer = 20;
let uholMier = 0;
let uholMier2 = 0;
let rychlost = 3;
let kruhX, kruhY;
let inputPs = 60;
let pressedKeys = { 87: 0, 83: 0, 65: 0, 68: 0, 13: 0, 107: 0, 109: 0, 81: 0 };
window.onload = function () {
    inicializeCanvas("canvas");
    kruhX = canvas.width / 3;
    kruhY = canvas.height / 3;
    mousePos.x = canvas.width / 2;
    mousePos.y = canvas.height / 2;
    document.addEventListener("keydown", (evt) => pressedKeys[evt.keyCode]++);
    document.addEventListener("keyup", (evt) => pressedKeys[evt.keyCode] = 0);
    canvas.addEventListener("click", function () {
        if (!fullscreenActive)
            canvas.requestFullscreen();
        if (!canvasPointerLock && fullscreenActive)
            canvas.requestPointerLock();
    });
    canvas.addEventListener("mousemove", calculateMouseCoordinates);
    mainCalculate();
    mainDraw();
    setInterval(mainCalculate, 1000 / inputPs);
    setInterval(mainDraw, 1000 / fps);
};
function calculateMouseCoordinates(e) {
    //if(!canvasPointerLock || !fullscreenActive) return;
    boundCanvas = canvas.getBoundingClientRect();
    if (!fullscreenActive) {
        mousePos.x = (e.clientX - boundCanvas.left) * scaleX;
        mousePos.y = (e.clientY - boundCanvas.top) * scaleY;
        return;
    }
    let pomerStran = ((canvas.width / canvas.height) < (boundCanvas.width / boundCanvas.height))
        ? (boundCanvas.height / canvas.height) : (boundCanvas.width / canvas.width);
    let rozdielCanvasFullscreenX = boundCanvas.width - (canvas.width * pomerStran);
    let rozdielCanvasFullscreenY = boundCanvas.height - (canvas.height * pomerStran);
    scaleX = canvas.width / (boundCanvas.width - rozdielCanvasFullscreenX);
    scaleY = canvas.height / (boundCanvas.height - rozdielCanvasFullscreenY);
    if (!canvasPointerLock) {
        mousePos.x = (e.clientX - rozdielCanvasFullscreenX / 2) * scaleX;
        mousePos.y = (e.clientY - rozdielCanvasFullscreenY / 2) * scaleY;
        return;
    }
    mousePos.x += e.movementX * scaleX;
    mousePos.y += e.movementY * scaleY;
}
function mainDraw() {
    canvasCtx.fillStyle = 'green';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    canvasCtx.fillStyle = 'red';
    for (let uhol = 0; uhol < Math.PI * 2; uhol += Math.PI / 60) {
        canvasCtx.fillRect(kruhX + Math.cos(uhol) * polomer, kruhY + Math.sin(uhol) * polomer, 1, 1);
    }
    canvasCtx.fillStyle = 'blue';
    canvasCtx.fillRect(kruhX - 3 + Math.cos(uholMier) * polomer, kruhY - 3 + Math.sin(uholMier) * polomer, 6, 6);
    canvasCtx.fillStyle = 'orange';
    canvasCtx.fillRect(kruhX - 3 + Math.cos(uholMier2) * polomer, kruhY - 3 + Math.sin(uholMier2) * polomer, 6, 6);
    canvasCtx.fillStyle = 'yellow';
    canvasCtx.fillRect(mousePos.x, mousePos.y, 6, 6);
    fullscreenLockmouseMsg();
}
function mainCalculate() {
    if (!canvasPointerLock || !fullscreenActive)
        return;
    uholMier2 = Math.atan((kruhY - mousePos.y) / (kruhX - mousePos.x));
    if ((kruhX) >= mousePos.x)
        uholMier2 += Math.PI;
    if (pressedKeys[68] > 0) {
        uholMier += Math.PI / 40;
    }
    if (pressedKeys[65] > 0) {
        uholMier -= Math.PI / 40;
    }
    if (pressedKeys[87] > 0) {
        kruhX += Math.cos(uholMier) * rychlost;
        kruhY += Math.sin(uholMier) * rychlost;
    }
    if (pressedKeys[83] > 0) {
        kruhX -= Math.cos(uholMier) * rychlost;
        kruhY -= Math.sin(uholMier) * rychlost;
    }
    if (pressedKeys[13] > 0)
        if (mainInterval != 0) {
            clearInterval(mainInterval);
            mainInterval = 0;
            console.log('off');
        }
        else {
            console.log('on');
            mainInterval = setInterval(mainCalculate, 30 / fps);
        }
}
//# sourceMappingURL=circle.js.map