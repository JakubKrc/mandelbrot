/*function isStable({real:real, imaginary:imaginary}):number{

    let kolkokratsomzopakoval = 0;

    for(let i=0; i<repeatStable; i++){
        if(real < -2 || real > 2 || imaginary < -2 || imaginary > 2)
            return repeatStable;
        ({real, imaginary} = mandel( {real, imaginary} , cCislo));
    }

    do{

        kolkokratsomzopakoval++;
        ({real, imaginary} = mandel( {real, imaginary} , cCislo));

    } while ( (imaginary < cCislo.imaginary-boundariesStable || imaginary > cCislo.imaginary+boundariesStable)
            && (real < cCislo.real-boundariesStable || real > cCislo.real+boundariesStable) && kolkokratsomzopakoval<repeatStable)

    return kolkokratsomzopakoval;

}*/
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
            nakresliKruh(os.x + real * mierkaZvacsenia, os.y + imaginary * mierkaZvacsenia);
        ({ real, imaginary } = mandel({ real, imaginary }, cCislo));
        if (vykreslit) {
            canvasCtx.lineTo(os.x + real * mierkaZvacsenia, os.y + imaginary * mierkaZvacsenia);
            canvasCtx.stroke();
        }
        kolkokratsomzopakoval++;
    } while ((imaginary < cCislo.imaginary - boundariesStable || imaginary > cCislo.imaginary + boundariesStable)
        && (real < cCislo.real - boundariesStable || real > cCislo.real + boundariesStable) && kolkokratsomzopakoval < repeatStable);
    if (vykreslit) {
        nakresliKruh(os.x + real * mierkaZvacsenia, os.y + imaginary * mierkaZvacsenia);
        canvasCtx.lineTo(os.x + cCislo.real * mierkaZvacsenia, os.y + cCislo.imaginary * mierkaZvacsenia);
        canvasCtx.stroke();
        nakresliKruh(os.x + cCislo.real * mierkaZvacsenia, os.y + cCislo.imaginary * mierkaZvacsenia);
    }
    return kolkokratsomzopakoval;
}
//# sourceMappingURL=mandel.js.map