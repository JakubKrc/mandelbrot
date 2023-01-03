function isStable(z:complexImaginary):number{

    let docasne:complexImaginary = {
        real:z.real,
        imaginary:z.imaginary
    }
    let pomocne = 0;

    for(let i=0; i<repeatStable; i++){
        if(docasne.real < -2 || docasne.real > 2 || docasne.imaginary < -2 || docasne.imaginary > 2)
            return repeatStable;
        docasne = mandel(docasne, cCislo);
    }

    do{

        pomocne++;
        docasne = mandel(docasne, cCislo);

    } while ( (docasne.imaginary < cCislo.imaginary-boundariesStable || docasne.imaginary > cCislo.imaginary+boundariesStable)
            && (docasne.real < cCislo.real-boundariesStable || docasne.real > cCislo.real+boundariesStable) && pomocne<repeatStable)

    return pomocne;

}

function nakresliKruh(x:number, y:number){

    canvasCtx.beginPath();
    canvasCtx.arc(x,y, canvas.width/150, 0, 2 * Math.PI, false);
    canvasCtx.stroke();

    canvasCtx.beginPath();
    canvasCtx.moveTo(x,y);

}

function opakovaneVykreslenie ( { real:real, imaginary:imaginary} ){

    canvasCtx.lineWidth = canvas.width/400;
    canvasCtx.strokeStyle = 'red';

    let kolkokratsomzopakoval = 0;

    do{

        nakresliKruh(os.x + real * mierkaZvacsenia,os.y + imaginary * mierkaZvacsenia);

        ({real, imaginary} = mandel( {real, imaginary} , cCislo));

        canvasCtx.lineTo(os.x + real * mierkaZvacsenia,os.y + imaginary * mierkaZvacsenia);
        canvasCtx.stroke();

        kolkokratsomzopakoval++;

    } while ( (imaginary < cCislo.imaginary-boundariesStable || imaginary > cCislo.imaginary+boundariesStable)
            && (real < cCislo.real-boundariesStable || real > cCislo.real+boundariesStable))

    nakresliKruh(os.x + cCislo.real * mierkaZvacsenia,os.y + cCislo.imaginary * mierkaZvacsenia);

    if (drawAxis) {
        canvasCtx.font = "100px Arial";
        canvasCtx.fillText(kolkokratsomzopakoval.toString(), 100, 100); 
    }

}