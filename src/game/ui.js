let drawRealTime = false;
document.querySelector("#label").addEventListener("submit", (event) => {
    event.preventDefault();
    mieraZoomu = parseFloat(document.querySelector("#zoom").value);
    mierkaZvacsenia = parseFloat(document.querySelector("#zvacsenie").value);
    cCislo.real = parseFloat(document.querySelector("#cR").value);
    cCislo.imaginary = parseFloat(document.querySelector("#cI").value);
    calculateResolution();
    calculateMainImage();
    vykresliEste = 0;
    document.querySelector("#label").style.display = 'none';
});
document.querySelectorAll("#zoom, #zvacsenie, #cR, #cI").forEach(() => addEventListener("input", function (event) {
    this.document.querySelector('#cRnumber').value = parseFloat(document.querySelector("#cR").value).toFixed(2);
    this.document.querySelector('#cInumber').value = parseFloat(document.querySelector("#cI").value).toFixed(2);
    if (!drawRealTime)
        return;
    mieraZoomu = parseFloat(document.querySelector("#zoom").value);
    mierkaZvacsenia = parseFloat(document.querySelector("#zvacsenie").value);
    cCislo.real = parseFloat(document.querySelector("#cR").value);
    cCislo.imaginary = parseFloat(document.querySelector("#cI").value);
    calculateResolution();
    calculateMainImage();
    vykresliEste = 0;
}));
document.querySelector("#axisCheck").addEventListener('change', () => {
    axis = !axis;
    vykresliEste = 0;
});
document.querySelector("#pointsCheck").addEventListener('change', () => {
    drawPoints = !drawPoints;
    vykresliEste = 0;
});
document.querySelector("#drawRealTime").addEventListener('change', () => {
    drawRealTime = !drawRealTime;
    calculateResolution();
    calculateMainImage();
    vykresliEste = 0;
});
function toggleLabel() {
    if (document.querySelector("#label").style.display == 'block')
        document.querySelector("#label").style.display = 'none';
    else
        document.querySelector("#label").style.display = 'block';
    document.querySelector("#zoom").value = mieraZoomu;
    document.querySelector("#zvacsenie").value = mierkaZvacsenia;
    document.querySelector("#cR").value = cCislo.real;
    this.document.querySelector('#cRnumber').value = cCislo.real.toFixed(2);
    document.querySelector("#cI").value = cCislo.imaginary;
    this.document.querySelector('#cInumber').value = cCislo.imaginary.toFixed(2);
    document.querySelector("#axisCheck").checked = axis;
    document.querySelector("#pointsCheck").checked = drawPoints;
    document.querySelector("#drawRealTime").checked = drawRealTime;
}
//# sourceMappingURL=ui.js.map