let mouseInicialized = false;
let needMouseLockToRun = false;
let needMouseLockToFollowMouse = false;

let mousePos = {x : 0,y : 0};

function inicializeMouse():void {

    mouseInicialized = true;
    mousePos.x = canvas.width/2;
    mousePos.y = canvas.height/2;

    canvas.addEventListener("click", function () {
    
        if (!fullscreenActive) canvas.requestFullscreen()
        if (!canvasPointerLock && fullscreenActive)
            canvas.requestPointerLock();
        
    });

    canvas.addEventListener("mousemove", calculateMouseCoordinates);
    canvas.addEventListener("mousedown", e => {
        switch (e.button){
            case 0:
                pressedKeys['leftMouseButton']++;
                break;
            case 1:
                pressedKeys['middleMouseButton']++;
                break;
            case 2:
                pressedKeys['rightMouseButton']++;
                break;
        }
    });
    document.addEventListener("mouseup", e => {
        switch (e.button){
            case 0:
                pressedKeys['leftMouseButton'] = 0;
                waitForKeyUp['leftMouseButton'] = false;
                break;
            case 1:
                pressedKeys['middleMouseButton'] = 0;
                waitForKeyUp['middleMouseButton'] = false;
                break;
            case 2:
                pressedKeys['rightMouseButton'] = 0;
                waitForKeyUp['rightMouseButton'] = false;
                break;
        }
    });

}

function calculateMouseCoordinates(e:any):void{
    if(needMouseLockToFollowMouse && !canvasPointerLock) return;
        
    boundCanvas = canvas.getBoundingClientRect();
                    
    if(!fullscreenActive){
        mousePos.x = (e.clientX - boundCanvas.left) * scaleX
        mousePos.y = (e.clientY - boundCanvas.top) * scaleY
        return;
    }
        
    let pomerStran = ((canvas.width/canvas.height) < (boundCanvas.width / boundCanvas.height)) 
        ? (boundCanvas.height/canvas.height) : (boundCanvas.width/canvas.width)
    let rozdielCanvasFullscreenX = boundCanvas.width - (canvas.width * pomerStran)
    let rozdielCanvasFullscreenY = boundCanvas.height - (canvas.height * pomerStran);
    
    scaleX = canvas.width  /  (boundCanvas.width - rozdielCanvasFullscreenX);
    scaleY = canvas.height / (boundCanvas.height - rozdielCanvasFullscreenY);
        
    if(!canvasPointerLock){
        mousePos.x = (e.clientX - rozdielCanvasFullscreenX/2) * scaleX
        mousePos.y = (e.clientY - rozdielCanvasFullscreenY/2) * scaleY
        return;
    }
        
    mousePos.x += e.movementX * scaleX; 
    mousePos.y += e.movementY * scaleY; 
}
