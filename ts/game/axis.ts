function drawAxis(){
    canvasCtx.fillStyle='green';
    canvasCtx.fillRect(0, os.y , canvas.width , canvas.height/400);
    canvasCtx.fillRect(os.x, 0 , canvas.width/400, canvas.height);
    canvasCtx.strokeStyle='green';
    canvasCtx.lineWidth = canvas.width/400;
    nakresliKruh(os.x + activePreset.cCislo.real*activePreset.mierkaZvacsenia,os.y+activePreset.cCislo.imaginary*activePreset.mierkaZvacsenia);
    canvasCtx.moveTo(os.x,os.y);
    canvasCtx.arc(os.x,os.y, activePreset.mierkaZvacsenia, 0, 2 * Math.PI, false);
    canvasCtx.stroke();
    canvasCtx.font = canvas.height/10+'px Arial';
    canvasCtx.fillText((opakovaneVykreslenie(hlavneCislo, drawPoints)+1).toString(), canvas.width/23, canvas.height/10); 
}