var mainInterval;
var scaleX, scaleY;
var boundCanvas;
var timeWait = [];
var polomer = 20;
var uholMier = 0;
var uholMier2 = 0;
var rychlost = 3;
var kruhX, kruhY;
var mousePos = { x: 0, y: 0 };
var canvasPointerLock = false;
var fullscreenActive = false;
var canvas, canvasCtx;
var fps = 60;
var inputPs = 60;
var pressedKeys = { 87: 0, 83: 0, 65: 0, 68: 0, 13: 0, 107: 0, 109: 0, 81: 0 };
window.onload = function () {
    canvas = document.querySelector('canvas');
    canvasCtx = canvas.getContext('2d');
    fitCanvasToBrowser();
    kruhX = canvas.width / 3;
    kruhY = canvas.height / 3;
    mousePos.x = canvas.width / 2;
    mousePos.y = canvas.height / 2;
    window.addEventListener('resize', fitCanvasToBrowser);
    document.addEventListener("keydown", function (evt) { return pressedKeys[evt.keyCode]++; });
    document.addEventListener("keyup", function (evt) { return pressedKeys[evt.keyCode] = 0; });
    canvas.addEventListener("click", function () {
        if (!fullscreenActive)
            canvas.requestFullscreen();
        if (!canvasPointerLock && fullscreenActive) {
            canvas.requestPointerLock();
            canvasMsgSimple('ESC to get back to browser ESC');
        }
    });
    document.addEventListener('pointerlockchange', function () { canvasPointerLock = !canvasPointerLock; });
    document.addEventListener('fullscreenchange', function () { fullscreenActive = !fullscreenActive; });
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
    var pomerStran = ((canvas.width / canvas.height) < (boundCanvas.width / boundCanvas.height))
        ? (boundCanvas.height / canvas.height) : (boundCanvas.width / canvas.width);
    var rozdielCanvasFullscreenX = boundCanvas.width - (canvas.width * pomerStran);
    var rozdielCanvasFullscreenY = boundCanvas.height - (canvas.height * pomerStran);
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
function fitCanvasToBrowser() {
    var pomerStran = ((window.innerWidth / window.innerHeight) > (canvas.width / canvas.height))
        ? window.innerHeight / canvas.height : window.innerWidth / canvas.width;
    canvas.style.width = pomerStran * canvas.width + "px";
    canvas.style.height = pomerStran * canvas.height + "px";
    boundCanvas = canvas.getBoundingClientRect();
    scaleX = canvas.width / boundCanvas.width;
    scaleY = canvas.height / boundCanvas.height;
}
function mainDraw() {
    canvasCtx.fillStyle = 'green';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    canvasCtx.fillStyle = 'red';
    for (var uhol = 0; uhol < Math.PI * 2; uhol += Math.PI / 60) {
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
function canvasMsgSimple(text) {
    canvasCtx.fillStyle = 'black';
    canvasCtx.fillRect(0.2 * canvas.width, 0.8 * canvas.height, 0.6 * canvas.width, 0.1 * canvas.height);
    canvasCtx.font = (canvas.height / 24) + "px Georgia";
    canvasCtx.fillStyle = "red";
    canvasCtx.textAlign = "center";
    canvasCtx.fillText(text, canvas.width / 2, canvas.height * 0.86);
}
function fullscreenLockmouseMsg() {
    if (!fullscreenActive && !canvasPointerLock) {
        canvasMsgSimple('Click on display to enter fullscreen.');
        return;
    }
    if (fullscreenActive && !canvasPointerLock) {
        canvasMsgSimple('Click on display to lock mouse.');
        return;
    }
    canvasMsgSimple("Press ESC to get back to browser.");
}
//# sourceMappingURL=circle.js.map