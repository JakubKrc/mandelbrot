let eventList: {repeats:number, howManyTimes:number, functionToRun:any,        //!!!!!!velka pochybnost asi cele, ale funguje to
    runThis:boolean, moveInEventList:number, repeatFunction:boolean}[] = [];

function eventInitialize (functionToRun:any, howManyTimes:number,        //timto mu v kode povies, kde daky script zacne, ako dlho pokracuje, co to robi
    moveInEventList=0, runThis = true, repeatFunction = false):void{       //ci ma preskocit na dalsi prikaz, ci to cele zopakuje do aleluja alebo raz
                                                                        //a kolko prikazov dozadu sa ma vratit pri zopakovani. 
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

                if(!item.repeatFunction) return arr.splice(index, 1);    //hm, zjavne ak sa to neopakuje, tak to proste vyhodi z pola eventov. ako som to nazval no

                item.repeats = 0;
                item.runThis = false;
                arr[index + item.moveInEventList].runThis = true;
                return;

            }
    
            eval(item.functionToRun);   //vraj sa nema pouzivat. len ako potom ulozit tu funkciu do databazy? json to zignoruje. ako pisat skripty?
            //item.functionToRun();        //ako to donutit cakat, toto funguje skvelo. a bez savovania to ide ze predas funkciu.

        });
    
}

function eventWait (howLong:number, runThis = false, moveInEventList = 1) {
    eventInitialize(f => {}, howLong, moveInEventList, runThis, true);
}