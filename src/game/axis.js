let os = {
    x: 0,
    y: 0
};
let axis = true;
function drawAxis() {
    canvasCtx.fillStyle = 'green';
    canvasCtx.fillRect(0, os.y, canvas.width, canvas.height / 400);
    canvasCtx.fillRect(os.x, 0, canvas.width / 400, canvas.height);
    canvasCtx.strokeStyle = 'green';
    canvasCtx.lineWidth = canvas.width / 400;
    nakresliKruh(os.x + cCislo.real * mierkaZvacsenia, os.y + cCislo.imaginary * mierkaZvacsenia);
    canvasCtx.moveTo(os.x, os.y);
    canvasCtx.arc(os.x, os.y, 2 * mierkaZvacsenia, 0, 2 * Math.PI, false);
    canvasCtx.stroke();
    opakovaneVykreslenie(hlavneCislo, true);
}
//# sourceMappingURL=axis.js.map