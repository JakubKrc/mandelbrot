const button1 = document.querySelector('#b1');

button1.addEventListener('click', e => {

    fetch('http://127.0.0.1:3000/sendLevelData', {
        method: 'POST',
        body: JSON.stringify( { "Objects": JSON.stringify(obj), "Events": JSON.stringify(eventList) } ),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(res => res)
    .catch(err => console.log(err))

    console.log("savujem level");
});

function getData(){
    return new Promise((resolve, reject) => {
        fetch("http://127.0.0.1:3000/getLevelData")
            .then( res => res.json() )
            .then( data => { 
                resolve(data)
            })
            .catch(err => console.log( err))
    })
}

const button2 = document.querySelector('#b2');
button2.addEventListener('click', e => {

    getData().then (data => {
        loadedLevel = JSON.parse(data[0].Objects); 
        loadedEvents = JSON.parse(data[0].Events)
    });
    console.log("loadujem level");
    
});

const button3 = document.querySelector('#b3');
button3.addEventListener('click', e => {

    mainInterval = false;

    console.log(loadedEvents);

    obj = [];
    for(let i in loadedLevel){
        eventList = loadedEvents;
        obj[i] = eval('new ' + loadedLevel[i].type + `()`);
        for (let variables in loadedLevel[i])
            obj[i][variables] = loadedLevel[i][variables];
    }

    camera.x = obj[selectedObject].x - canvas.width/2;
    camera.y = obj[selectedObject].y - canvas.height/2;
    camera.moveXspeed = 0;
    camerad.moveYspeed = 0;

    mainInterval = true;

});

let loadedLevel=null;
let loadedEvents=null;