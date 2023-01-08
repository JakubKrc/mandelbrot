function calculateResolution() {
    spaceBetweePixels = (1 / activePreset.mierkaZvacsenia);
    canvas.width = ((activePreset.mierkaZvacsenia * (4 / activePreset.mieraZoomu)) / 9) * 16;
    canvas.height = activePreset.mierkaZvacsenia * (4 / activePreset.mieraZoomu);
    howMuchFromSetX = (2 + ((2 / 9) * 7)) * (1 / activePreset.mieraZoomu);
    howMuchFromSetY = 2 * (1 / activePreset.mieraZoomu);
    os.x = canvas.width / 2;
    os.y = canvas.height / 2;
    mainImage = canvasCtx.createImageData(canvas.width, canvas.height);
    fitCanvasToBrowser();
}
function calculateMainImage() {
    for (let x = -howMuchFromSetX; x < howMuchFromSetX - spaceBetweePixels; x += spaceBetweePixels)
        for (let y = -howMuchFromSetY; y < howMuchFromSetY; y += spaceBetweePixels)
            putPixelIntoMainImage(Math.round(os.y + y * activePreset.mierkaZvacsenia), Math.round(os.x + x * activePreset.mierkaZvacsenia), opakovaneVykreslenie({ real: x, imaginary: y }, false));
}
function putPixelIntoMainImage(x, y, color) {
    mainImage.data[(x * canvas.width * 4) + (y * 4) + 0] = activePreset.palette.color.r + (activePreset.palette.multiplier.r * color);
    mainImage.data[(x * canvas.width * 4) + (y * 4) + 1] = activePreset.palette.color.g + (activePreset.palette.multiplier.g * color);
    mainImage.data[(x * canvas.width * 4) + (y * 4) + 2] = activePreset.palette.color.b + (activePreset.palette.multiplier.b * color);
    mainImage.data[(x * canvas.width * 4) + (y * 4) + 3] = 255;
}
//# sourceMappingURL=draw.js.map