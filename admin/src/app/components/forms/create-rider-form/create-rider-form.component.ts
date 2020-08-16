import { Inject, Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DbService } from 'app/services/db.service';
import { Rider } from 'app/models/rider';
import * as _ from 'lodash';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-create-rider-form',
  templateUrl: './create-rider-form.component.html',
  styleUrls: ['./create-rider-form.component.css']
})
export class CreateRiderFormComponent implements OnInit {

  profileForm : FormGroup;
  actionType: String;
  action: String;
  committed: boolean = false;
  userBillingsMethods = [];
  billingsMethodsCount = 0;
  config: any;
  rider: Rider;
  

  constructor(private fb: FormBuilder, private dbservice : DbService,
    public dialogRef: MatDialogRef<CreateRiderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async ngOnInit() {
    this.rider = this.data.rider
    console.log(this.rider);
    this.profileForm = this.fb.group({
      name: [this.rider.name, Validators.required],
      mobileNumber: [this.rider.mobileNumber, Validators.required],
      address: [this.rider.address],
      email: [this.rider.email,  Validators.required],
      region: [this.rider.region],
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
      var query = {user_id : this.rider._id};
      var countResult = await this.dbservice.countBillingMethods(query);
      console.log(countResult);
      this.config = {
        itemsPerPage: 15,
        currentPage: 1,
        totalItems: countResult.count
      };
      this.billingsMethodsCount = countResult.count;
      this.dbservice.getBillingMethods(0, 15, query).subscribe((data) => {
        this.userBillingsMethods = _.union(this.userBillingsMethods, data);
        console.log(data);
      });
    }
  }

  pageChanged(event){
    console.log(event);
    var query = {user_id : this.rider._id};
    this.dbservice.getBillingMethods(event, 15, query).subscribe((data) => {
      this.userBillingsMethods = _.union(this.userBillingsMethods, data);
      console.log(data);
      this.config.currentPage = event;
    });
  }

  onSubmit(): void{
    var rider = new Rider();
    rider.name = this.getFormFieldValue('name');
    rider.mobileNumber = this.getFormFieldValue('mobileNumber');
    rider.email = this.getFormFieldValue('email');
    var query = {mobileNumber : rider.mobileNumber};
    this.dbservice.createRider(rider,query).then((data) => {
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

  getUserBillingMethods(){

  }

  

}


