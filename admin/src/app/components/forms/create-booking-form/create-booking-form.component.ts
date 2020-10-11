import { Inject, Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DbService } from 'app/services/db.service';
import { Trip } from 'app/models/trip';
import * as _ from 'lodash';



export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-create-booking-form',
  templateUrl: './create-booking-form.component.html',
  styleUrls: ['./create-booking-form.component.css']
})
export class CreateBookingFormComponent implements OnInit {
  
  profileForm : FormGroup;
  actionType: String;
  action: String;
  committed: boolean = false;
  userBillingsMethods = [];
  billingsMethodsCount = 0;
  config: any;
  trip:Trip;
  

  constructor(private fb: FormBuilder, private dbservice : DbService,
    public dialogRef: MatDialogRef<CreateBookingFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
  
    async ngOnInit() {
      this.trip = this.data.trip
      console.log(this.trip);
      this.profileForm = this.fb.group({
        created: [this.trip.created],
        createdBy: [this.trip.createdBy],
        active: [this.trip.active],
        updated: [this.trip.updated]
      });
  
      this.actionType = this.data.action;
      
      if(this.actionType === "update"){
        this.action = "Update";
      }
      else if(this.actionType === "view"){
        this.action = "view";
      } else {
        this.action = "Create";
      }
  
      console.log(this.action);
  
      if(this.viewPage()){
       var query = {createdBy : this.trip.createdBy};
        var countResult = await this.dbservice.countBillingMethods(query);
        console.log(countResult);
        this.config = {
          itemsPerPage: 15,
          currentPage: 1,
          totalItems: countResult.count
        };
        this.billingsMethodsCount = countResult.count;
        this.dbservice.getBillingMethods(0, 15,query).subscribe((data) => {
          this.userBillingsMethods = _.union(this.userBillingsMethods, data);
          console.log(data);
        });
      }
    }
  
    pageChanged(event){
      console.log(event);
      var query = {createdBy : this.trip.createdBy};
      this.dbservice.getBillingMethods(event, 15, query).subscribe((data) => {
        this.userBillingsMethods = _.union(this.userBillingsMethods, data);
        console.log(data);
        this.config.currentPage = event;
      });
    }
  
    onSubmit(): void{
      var trip = new Trip();
      trip.created = this.getFormFieldValue('created');
      trip.createdBy = this.getFormFieldValue('createdBy');
      trip.updated=this.getFormFieldValue('updated');
      trip.startTime=this.getFormFieldValue('startTime');
      trip.estimatedDuration=this.getFormFieldValue('estimatedDuration');
      trip.estimatedCost=this.getFormFieldValue('estimatedCost');
      trip.estimatedEndTime=this.getFormFieldValue('estimatedEndTime');
      var query = {createdBy : trip.createdBy};
      this.dbservice.createTrip(trip, query).then((data) => {
        console.log(data);
        this.committed = true;
      });
    }
  
    get name() { return this.profileForm.get('name'); }
  
    getFormFieldValue(fieldname): any { 
      return this.profileForm.get(fieldname).value; 
    }
  
    viewPage(){
      if (this.action == "view"){
        return true;
      }
      return false;
    }
  
    disabledField(){
      if (this.action == "view"){
        return "disabled";
      }
      return "";
    }

}
