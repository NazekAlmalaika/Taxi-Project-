import { Inject, Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DbService } from 'app/services/db.service';

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

  constructor(private fb: FormBuilder, private dbservice : DbService,
    public dialogRef: MatDialogRef<CreateRiderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void{
    this.profileForm = this.fb.group({
      name: [this.data.name, Validators.required],
      mobileNumber: [this.data.mobileNumber, Validators.required],
      address: [this.data.address, Validators.required],
      email: [this.data.email],
      city: [this.data.city],
      country: [this.data.country],
      postalCode: [this.data.postalCode]
    
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
  }

  onSubmit(): void{

    this.dbservice.createRider({
      name : this.getFormFieldValue('name'),
      mobileNumber: this.getFormFieldValue('mobileNumber'),
      email: this.getFormFieldValue('email')
    }).subscribe((data) => {
      console.log(data);
      this.committed = true;
    });

  }

  get name() { return this.profileForm.get('name'); }

  getFormFieldValue(fieldname): any { 
    return this.profileForm.get(fieldname).value; 
  }



}


