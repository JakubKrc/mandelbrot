let eventList = [];
function eventInitialize(functionToRun, howManyTimes, moveInEventList = 0, runThis = true, repeatFunction = false) {
    eventList.push({ functionToRun: functionToRun, repeats: 0, howManyTimes: howManyTimes,
        runThis: runThis, moveInEventList: moveInEventList, repeatFunction: repeatFunction });
}
function eventsRun() {
    eventList.forEach(function callback(item, index, arr) {
        if (!item.runThis)
            return;
        item.repeats++;
        if (item.repeats > item.howManyTimes) {
            if (!item.repeatFunction)
                return arr.splice(index, 1);
            item.repeats = 0;
            item.runThis = false;
            arr[index + item.moveInEventList].runThis = true;
            return;
        }
        eval(item.functionToRun);
        //item.functionToRun();
    });
}
function eventWait(howLong, runThis = false, moveInEventList = 1) {
    eventInitialize(f => { }, howLong, moveInEventList, runThis, true);
}
//# sourceMappingURL=events.js.map