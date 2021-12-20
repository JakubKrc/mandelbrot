let eventList: {repeats:number, howManyTimes:number, functionToRun:any, 
    runThis:boolean, moveInEventList:number, repeatFunction:boolean}[] = [];

function eventInitialize (functionToRun:any, howManyTimes:number, 
    moveInEventList=0, runThis = true, repeatFunction = false):void{

        eventList.push(
        {functionToRun: functionToRun, repeats: 0, howManyTimes: howManyTimes, 
            runThis:runThis, moveInEventList:moveInEventList, repeatFunction:repeatFunction}
    );

}

function eventsRun() {

    eventList.forEach(
        function callback(item, index, arr) {

            if (!item.runThis) return;
            item.repeats++;

            if (item.repeats > item.howManyTimes){

                if(!item.repeatFunction) return arr.splice(index, 1);

                item.repeats = 0;
                item.runThis = false;
                arr[index + item.moveInEventList].runThis = true;
                return;

            }
    
            eval(item.functionToRun);
            //item.functionToRun();

        });
    
}

function eventWait (howLong:number, runThis = false, moveInEventList = 1) {
    eventInitialize(f => {}, howLong, moveInEventList, runThis, true);
}