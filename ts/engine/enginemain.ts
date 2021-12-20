let needFullscreenToRun = false;

let scaleX:number, scaleY:number;
let boundCanvas:{left:number, right:number, top:number, width:number, height:number};

let canvas:any,canvasCtx:any;

let canvasPointerLock = false;
let fullscreenActive = false;

let canvasMsg:string = null;

function inicializeCanvas(canvasName:string) {
    canvas = document.querySelector(canvasName);
    canvasCtx = canvas.getContext('2d');
    
    fitCanvasToBrowser();
    window.addEventListener('resize', fitCanvasToBrowser);

    if(needMouseLockToRun)
        document.addEventListener('pointerlockchange', function() {
            canvasPointerLock = !canvasPointerLock;
            canvasMsg = "Press ESC to get back to browser";
            eventWait(fps * 7, true);
            eventInitialize (f => canvasMsg=null, 1, 0, false, false);
        });
    if(needFullscreenToRun)
        document.addEventListener('fullscreenchange', function() {
            fullscreenActive = !fullscreenActive;
            canvasMsg = "Press ESC to get back to browser";
            eventWait(fps * 7, true);
            eventInitialize (f => canvasMsg=null, 1, 0, false, false);
        });
}

function fitCanvasToBrowser():void {

    let pomerStran = ((window.innerWidth/window.innerHeight) > (canvas.width/canvas.height))
        ? window.innerHeight/canvas.height : window.innerWidth/canvas.width;

    canvas.style.width = pomerStran * canvas.width + "px";
    canvas.style.height = pomerStran * canvas.height+ "px";
    
    boundCanvas = canvas.getBoundingClientRect();
                                
    scaleX = canvas.width/boundCanvas.width;
    scaleY = canvas.height/boundCanvas.height;
    
}

function canvasMsgSimple(text:string):void {
    
    canvasCtx.fillStyle='black';
    canvasCtx.fillRect(0.2*canvas.width , 0.8*canvas.height, 0.6*canvas.width, 0.1*canvas.height)
    canvasCtx.font = (canvas.height/24) + "px Georgia";
    canvasCtx.fillStyle = "red";
    canvasCtx.textAlign = "center";
    canvasCtx.fillText(text , canvas.width/2, canvas.height*0.86); 
    
}

function fullscreenLockmouseMsg():void {

    if (canvasMsg != null)
        return canvasMsgSimple(canvasMsg);

    if (!fullscreenActive && !canvasPointerLock && needFullscreenToRun)
        canvasMsgSimple('Click on display to enter fullscreen.');

    if (fullscreenActive && !canvasPointerLock && needMouseLockToRun)
        canvasMsgSimple('Click on display to lock mouse.');

}