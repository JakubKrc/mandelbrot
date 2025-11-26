function presetOut () {

    console.log(
        'presetArray[ ] = {'+ 
            'mierkaZvacsenia:'+activePreset.mierkaZvacsenia+','+
            'mieraZoomu:'+activePreset.mieraZoomu+','+
            'cCislo:{'+
                'real:'+activePreset.cCislo.real+','+
                'imaginary:'+activePreset.cCislo.imaginary+','+
            '},'+
            'palette : {'+
                'color:{'+
                    'r:'+activePreset.palette.color.r+','+
                    'g:'+activePreset.palette.color.g+','+
                    'b:'+activePreset.palette.color.b+','+
                '},'+
                'multiplier:{'+
                    'r:'+activePreset.palette.multiplier.r+','+
                    'g:'+activePreset.palette.multiplier.g+','+
                    'b:'+activePreset.palette.multiplier.b+','+
                '}'+
            '}'+    
        '}');

}

function presetIn(i:number){

    presetArray[0] = {mierkaZvacsenia:544,mieraZoomu:1.57,cCislo:{real:0.318,imaginary:-0.03,},palette : {color:{r:30,g:40,b:50,},multiplier:{r:3,g:4,b:5,}}}
    presetArray[1] = {mierkaZvacsenia:718,mieraZoomu:2.17,cCislo:{real:-0.698,imaginary:0.357,},palette : {color:{r:12,g:12,b:60,},multiplier:{r:1,g:2,b:4,}}}
    presetArray[2] = {mierkaZvacsenia:184,mieraZoomu:1.69,cCislo:{real:0.229,imaginary:0.544,},palette : {color:{r:30,g:120,b:20,},multiplier:{r:2,g:-2,b:3,}}}
    presetArray[3] = {mierkaZvacsenia:1000,mieraZoomu:4.09,cCislo:{real:0.383,imaginary:0.175,},palette : {color:{r:3,g:20,b:0,},multiplier:{r:1,g:2,b:-1,}}}
    presetArray[4] = {mierkaZvacsenia:1000,mieraZoomu:6.5,cCislo:{real:0.323,imaginary:-0.034,},palette : {color:{r:30,g:40,b:160,},multiplier:{r:2,g:2,b:1,}}}
    activePreset = presetArray[i];

    mainReset();

}