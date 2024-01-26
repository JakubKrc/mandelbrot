let presetArray = [];
let fps = 20;
let mainInterval = true;
let hlavneCislo = {
    imaginary: 0,
    real: 0
};
let os = {
    x: 0,
    y: 0
};
let axis = false;
let mainImage;
let repeatStable = 100;
let boundariesStable = 0;
let vykresliEste;
let elementsButtons;
let drawPoints = true;
let drawRealTime = true;
let spaceBetweePixels;
let howMuchFromSetX;
let howMuchFromSetY;
let itinerations = 0;
//co treba nacitat do presetu
let activePreset = {
    mierkaZvacsenia: 100,
    mieraZoomu: 2,
    cCislo: {
        real: 0,
        imaginary: 0
    },
    palette: {
        color: {
            r: 12,
            g: 12,
            b: 60
        },
        multiplier: {
            r: 3,
            g: 2,
            b: 4
        }
    }
};
//# sourceMappingURL=values.js.map