let howManyPixelsToFillTheGap=3;

function putPixelIntoMainImage(x:number, y:number, color:number){

    for (let x2=0; x2<howManyPixelsToFillTheGap; x2++ )
        for (let y2=0; y2<howManyPixelsToFillTheGap; y2++)
            mainImage[x + x2][y + y2] = color;

}

function calculateMainImage(){
    for(let x=-2;x<2;x+=0.01)
        for(let y=-2;y<2;y+=0.01)
            putPixelIntoMainImage(Math.round(os.x + x * mierkaZvacsenia),Math.round(os.y + y * mierkaZvacsenia),opakovaneVykreslenie({real:x,imaginary:y}, false));
}