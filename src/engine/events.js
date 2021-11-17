let eventList = [];
function inicializeEvent(functionToRun, howManyTimes, moveInEventList = 0, runThis = true, repeatFunction = false) {
    eventList.push({ functionToRun: functionToRun, repeats: 0, howManyTimes: howManyTimes,
        runThis: runThis, moveInEventList: moveInEventList, repeatFunction: repeatFunction });
}
function runEvents() {
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
        item.functionToRun();
    });
}
//# sourceMappingURL=events.js.map