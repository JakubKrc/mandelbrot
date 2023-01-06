let mierkaZvacsenia;
let spaceBetweePixels;
let mieraZoomu;
let howMuchFromSetX;
let howMuchFromSetY;
let drawPoints = false;
function calculateResolution() {
    spaceBetweePixels = (1 / mierkaZvacsenia);
    canvas.width = ((mierkaZvacsenia * (4 / mieraZoomu)) / 9) * 16;
    canvas.height = mierkaZvacsenia * (4 / mieraZoomu);
    howMuchFromSetX = (2 + ((2 / 9) * 7)) * (1 / mieraZoomu);
    howMuchFromSetY = 2 * (1 / mieraZoomu);
    os.x = canvas.width / 2;
    os.y = canvas.height / 2;
    mainImage = canvasCtx.createImageData(canvas.width, canvas.height);
    fitCanvasToBrowser();
}
function calculateMainImage() {
    for (let x = -howMuchFromSetX; x < howMuchFromSetX - spaceBetweePixels; x += spaceBetweePixels)
        for (let y = -howMuchFromSetY; y < howMuchFromSetY; y += spaceBetweePixels)
            putPixelIntoMainImage(Math.round(os.y + y * mierkaZvacsenia), Math.round(os.x + x * mierkaZvacsenia), opakovaneVykreslenie({ real: x, imaginary: y }, false));
}
function putPixelIntoMainImage(x, y, color) {
    mainImage.data[(x * canvas.width * 4) + (y * 4) + 0] = 12 + (3 * color);
    mainImage.data[(x * canvas.width * 4) + (y * 4) + 1] = 12 + (2 * color);
    mainImage.data[(x * canvas.width * 4) + (y * 4) + 2] = 60 + (4 * color);
    mainImage.data[(x * canvas.width * 4) + (y * 4) + 3] = 255;
}
//# sourceMappingURL=draw.js.map