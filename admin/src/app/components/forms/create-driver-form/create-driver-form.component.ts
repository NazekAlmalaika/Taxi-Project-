import { Component, OnInit, Inject } from '@angular/core';
import { Driver } from 'app/models/driver';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DbService } from 'app/services/db.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';

@Component({
  selector: 'app-create-driver-form',
  templateUrl: './create-driver-form.component.html',
  styleUrls: ['./create-driver-form.component.css']
})
export class CreateDriverFormComponent implements OnInit {

  profileForm : FormGroup;
  actionType: String;
  action: String;
  committed: boolean = false;
  userBillingsMethods = [];
  billingsMethodsCount = 0;
  config: any;
  driver: Driver;
  

  constructor(private fb: FormBuilder, private dbservice : DbService,
    public dialogRef: MatDialogRef<CreateDriverFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async ngOnInit() {
    this.driver = this.data.driver
    console.log(this.driver);
    this.profileForm = this.fb.group({
      name: [this.driver.name, Validators.required],
      mobileNumber: [this.driver.mobileNumber, Validators.required],
      address: [this.driver.address],
      email: [this.driver.email,  Validators.required],
      region: [this.driver.region],
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
      var query = {user_id : this.driver._id};
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
    var query = {user_id : this.driver._id};
    this.dbservice.getBillingMethods(event, 15, query).subscribe((data) => {
      this.userBillingsMethods = _.union(this.userBillingsMethods, data);
      console.log(data);
      this.config.currentPage = event;
    });
  }

  onSubmit(): void{
    var driver = new Driver();
    driver.name = this.getFormFieldValue('name');
    driver.mobileNumber = this.getFormFieldValue('mobileNumber');
    driver.email = this.getFormFieldValue('email');
    var query = {mobileNumber : driver.mobileNumber};
    this.dbservice.createDriver(driver,query).then((data) => {
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
