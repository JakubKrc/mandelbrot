let needFullscreenToRun = false;
let needMouseLockToRun = false;
let needMouseLockToFollowMouse = false;
let mainInterval;
let fps = 24;
let scaleX, scaleY;
let boundCanvas;
let canvas, canvasCtx;
let mousePos = { x: 0, y: 0 };
let canvasPointerLock = false;
let fullscreenActive = false;
function inicializeCanvas(canvasName) {
    canvas = document.querySelector(canvasName);
    canvasCtx = canvas.getContext('2d');
    fitCanvasToBrowser();
    window.addEventListener('resize', fitCanvasToBrowser);
    document.addEventListener('pointerlockchange', function () { canvasPointerLock = !canvasPointerLock; });
    document.addEventListener('fullscreenchange', function () { fullscreenActive = !fullscreenActive; });
}
function fitCanvasToBrowser() {
    let pomerStran = ((window.innerWidth / window.innerHeight) > (canvas.width / canvas.height))
        ? window.innerHeight / canvas.height : window.innerWidth / canvas.width;
    canvas.style.width = pomerStran * canvas.width + "px";
    canvas.style.height = pomerStran * canvas.height + "px";
    boundCanvas = canvas.getBoundingClientRect();
    scaleX = canvas.width / boundCanvas.width;
    scaleY = canvas.height / boundCanvas.height;
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
//# sourceMappingURL=enginesource.js.map