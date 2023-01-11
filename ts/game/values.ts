type presetValues = {

    mierkaZvacsenia:number,
    mieraZoomu:number,
    cCislo:complexImaginary,
    palette:{
        color : {
            r:number,
            g:number,
            b:number
        },
        multiplier : {
            r:number,
            g:number,
            b:number
        }
    }

}

let presetArray = [];

type complexImaginary = {real:number,imaginary:number}; 

let fps = 30;
let mainInterval = true;

let hlavneCislo:complexImaginary = {
    imaginary : 0,
    real : 0
};

let os = {
    x: 0,
    y: 0
};
let axis = false;

let mainImage : any;
let repeatStable = 100;
let boundariesStable = 0;
let vykresliEste:number;
let elementsButtons;

let drawPoints=false;
let drawRealTime = true;

let spaceBetweePixels:number;
let howMuchFromSetX:number;
let howMuchFromSetY:number;

//co treba nacitat do presetu

let activePreset:presetValues = {

    mierkaZvacsenia : 150,
    mieraZoomu : 2,

    cCislo : { 
        real : 0,
        imaginary: 0
    },

    palette : {
        color : {
            r: 12,
            g: 12,
            b: 60
        },
        multiplier : {
            r:3,
            g:2,
            b:4
        }
    }

}