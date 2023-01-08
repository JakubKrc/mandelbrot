function squareComplexImaginary(z) {
    return { real: z.real * z.real - z.imaginary * z.imaginary,
        imaginary: 2 * z.real * z.imaginary };
}
function addComplexImaginary(x, y) {
    return { real: x.real + y.real, imaginary: x.imaginary + y.imaginary };
}
function mandel(z, c) {
    return addComplexImaginary(squareComplexImaginary(z), c);
}
function nakresliKruh(x, y) {
    canvasCtx.beginPath();
    canvasCtx.arc(x, y, canvas.width / 150, 0, 2 * Math.PI, false);
    canvasCtx.stroke();
    canvasCtx.beginPath();
    canvasCtx.moveTo(x, y);
}
function opakovaneVykreslenie({ real: real, imaginary: imaginary }, vykreslit) {
    if (vykreslit) {
        canvasCtx.lineWidth = canvas.width / 400;
        canvasCtx.strokeStyle = 'red';
    }
    let kolkokratsomzopakoval = 0;
    do {
        if (vykreslit)
            nakresliKruh(os.x + real * activePreset.mierkaZvacsenia, os.y + imaginary * activePreset.mierkaZvacsenia);
        ({ real, imaginary } = mandel({ real, imaginary }, activePreset.cCislo));
        if (vykreslit) {
            canvasCtx.lineTo(os.x + real * activePreset.mierkaZvacsenia, os.y + imaginary * activePreset.mierkaZvacsenia);
            canvasCtx.stroke();
        }
        kolkokratsomzopakoval++;
    } while ((imaginary < activePreset.cCislo.imaginary - boundariesStable || imaginary > activePreset.cCislo.imaginary + boundariesStable)
        && (real < activePreset.cCislo.real - boundariesStable || real > activePreset.cCislo.real + boundariesStable) && kolkokratsomzopakoval < repeatStable);
    if (vykreslit) {
        nakresliKruh(os.x + real * activePreset.mierkaZvacsenia, os.y + imaginary * activePreset.mierkaZvacsenia);
        canvasCtx.lineTo(os.x + activePreset.cCislo.real * activePreset.mierkaZvacsenia, os.y + activePreset.cCislo.imaginary * activePreset.mierkaZvacsenia);
        canvasCtx.stroke();
        nakresliKruh(os.x + activePreset.cCislo.real * activePreset.mierkaZvacsenia, os.y + activePreset.cCislo.imaginary * activePreset.mierkaZvacsenia);
    }
    return kolkokratsomzopakoval;
}
//# sourceMappingURL=mandel.js.map