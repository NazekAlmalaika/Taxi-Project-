import { DatePipe, Time } from "@angular/common";

export class Trip {
    created : String;
    updated : String;
    createdBy : String;
    active : boolean = false;
    estimatedCost: Number;
    estimatedDuration: Time;
    startTime: DatePipe;
    estimatedEndTime: DatePipe;


    
    constructor(){

    }


}
