function mainReset() {
    calculateResolution();
    calculateMainImage();
    vykresliEste = 0;
}
function okForMenu() {
    document.querySelector('.menu').classList.toggle('open');
    activePreset.mieraZoomu = parseFloat(document.querySelector("#zoom").value);
    activePreset.mierkaZvacsenia = parseFloat(document.querySelector("#zvacsenie").value);
    activePreset.cCislo.real = parseFloat(document.querySelector("#cR").value);
    activePreset.cCislo.imaginary = parseFloat(document.querySelector("#cI").value);
    activePreset.palette.color.r = parseFloat(document.querySelector("#Rcolor").value);
    activePreset.palette.color.g = parseFloat(document.querySelector("#Gcolor").value);
    activePreset.palette.color.b = parseFloat(document.querySelector("#Bcolor").value);
    activePreset.palette.multiplier.r = parseFloat(document.querySelector("#Rmultiplier").value);
    activePreset.palette.multiplier.g = parseFloat(document.querySelector("#Gmultiplier").value);
    activePreset.palette.multiplier.b = parseFloat(document.querySelector("#Bmultiplier").value);
    mainReset();
}
document.querySelector("#zoom").addEventListener('input', () => {
    activePreset.mieraZoomu = parseFloat(document.querySelector("#zoom").value);
    if (!drawRealTime)
        return;
    mainReset();
});
document.querySelector("#zvacsenie").addEventListener('input', () => {
    activePreset.mierkaZvacsenia = parseFloat(document.querySelector("#zvacsenie").value);
    if (!drawRealTime)
        return;
    mainReset();
});
document.querySelector("#cR").addEventListener('input', () => {
    activePreset.cCislo.real = parseFloat(document.querySelector("#cR").value);
    document.querySelector('#cRnumber').value = activePreset.cCislo.real.toFixed(2);
    if (!drawRealTime)
        return;
    mainReset();
});
document.querySelector("#cI").addEventListener('input', () => {
    activePreset.cCislo.imaginary = parseFloat(document.querySelector("#cI").value);
    document.querySelector('#cInumber').value = activePreset.cCislo.imaginary.toFixed(2);
    if (!drawRealTime)
        return;
    mainReset();
});
document.querySelector("#cRnumber").addEventListener('input', () => {
    activePreset.cCislo.real = parseFloat(document.querySelector("#cRnumber").value);
    document.querySelector("#cR").value = activePreset.cCislo.real;
    if (!drawRealTime)
        return;
    mainReset();
});
document.querySelector("#cInumber").addEventListener('input', () => {
    activePreset.cCislo.imaginary = parseFloat(document.querySelector("#cInumber").value);
    document.querySelector("#cI").value = activePreset.cCislo.imaginary;
    if (!drawRealTime)
        return;
    mainReset();
});
document.querySelector("#Rcolor").addEventListener('input', () => {
    activePreset.palette.color.r = parseFloat(document.querySelector("#Rcolor").value);
    if (!drawRealTime)
        return;
    mainReset();
});
document.querySelector("#Gcolor").addEventListener('input', () => {
    activePreset.palette.color.g = parseFloat(document.querySelector("#Gcolor").value);
    if (!drawRealTime)
        return;
    mainReset();
});
document.querySelector("#Bcolor").addEventListener('input', () => {
    activePreset.palette.color.b = parseFloat(document.querySelector("#Bcolor").value);
    if (!drawRealTime)
        return;
    mainReset();
});
document.querySelector("#Rmultiplier").addEventListener('input', () => {
    activePreset.palette.multiplier.r = parseFloat(document.querySelector("#Rmultiplier").value);
    if (!drawRealTime)
        return;
    mainReset();
});
document.querySelector("#Gmultiplier").addEventListener('input', () => {
    activePreset.palette.multiplier.g = parseFloat(document.querySelector("#Gmultiplier").value);
    if (!drawRealTime)
        return;
    mainReset();
});
document.querySelector("#Bmultiplier").addEventListener('input', () => {
    activePreset.palette.multiplier.b = parseFloat(document.querySelector("#Bmultiplier").value);
    if (!drawRealTime)
        return;
    mainReset();
});
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
    mainReset();
});
function toggleMenu() {
    document.querySelector('.container-menu .mainMenu').classList.toggle('open');
    if (document.querySelector('.container-menu .presetsMenu').classList.contains('open'))
        document.querySelector('.container-menu .presetsMenu').classList.toggle('open');
    document.querySelector("#zoom").value = activePreset.mieraZoomu;
    document.querySelector("#zvacsenie").value = activePreset.mierkaZvacsenia;
    document.querySelector("#cR").value = activePreset.cCislo.real;
    document.querySelector('#cRnumber').value = activePreset.cCislo.real.toFixed(2);
    document.querySelector("#cI").value = activePreset.cCislo.imaginary;
    document.querySelector('#cInumber').value = activePreset.cCislo.imaginary.toFixed(2);
    document.querySelector("#Rcolor").value = activePreset.palette.color.r;
    document.querySelector("#Gcolor").value = activePreset.palette.color.g;
    document.querySelector("#Bcolor").value = activePreset.palette.color.b;
    document.querySelector("#Rmultiplier").value = activePreset.palette.multiplier.r;
    document.querySelector("#Gmultiplier").value = activePreset.palette.multiplier.g;
    document.querySelector("#Bmultiplier").value = activePreset.palette.multiplier.b;
    document.querySelector("#axisCheck").checked = axis;
    document.querySelector("#pointsCheck").checked = drawPoints;
    document.querySelector("#drawRealTime").checked = drawRealTime;
}
function toggleMenuPresets() {
    document.querySelector('.container-menu .presetsMenu').classList.toggle('open');
    if (document.querySelector('.container-menu .mainMenu').classList.contains('open'))
        document.querySelector('.container-menu .mainMenu').classList.toggle('open');
}
function toggleMenuValues() {
    document.querySelector('.container-menu .valuesMenu').classList.toggle('openValuesMenu');
}
function updateValuesMenu() {
    document.querySelector("#itinerations").innerText = itinerations;
    document.querySelector("#max-itinerations").innerText = repeatStable + 1;
    document.querySelector("#cCisloreal").innerText = activePreset.cCislo.real;
    document.querySelector("#cCisloimaginary").innerText = activePreset.cCislo.imaginary;
}
//# sourceMappingURL=ui.js.map