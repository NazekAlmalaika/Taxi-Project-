import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DbService } from 'app/services/db.service';
import { BillingMethod } from 'app/models/billing-method';
import {PaymentMethods} from 'app/models/constants'

@Component({
  selector: 'app-create-billing-method-form',
  templateUrl: './create-billing-method-form.component.html',
  styleUrls: ['./create-billing-method-form.component.css']
})
export class CreateBillingMethodFormComponent implements OnInit {

  billingMethodForm : FormGroup;
  actionType: String;
  action: String;
  committed: boolean = false;
  paymentMethods = PaymentMethods;

  constructor(private fb: FormBuilder, private dbservice : DbService,
    public dialogRef: MatDialogRef<CreateBillingMethodFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void{
    this.billingMethodForm = this.fb.group({
      user: [this.data.name + " " +this.data.mobileNumber, Validators.required],
      user_id: [this.data.user_id, Validators.required],
      paymentMethod: [this.data.paymentMethod, Validators.required],
      active: [this.data.paymentMethod]
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
    console.log(this.paymentMethods);
  }

  onSubmit(): void{

    var billingMethod = new BillingMethod();
    billingMethod.user_id = this.getFormFieldValue('user_id');
    billingMethod.paymentMethod = this.getFormFieldValue('paymentMethod');
    billingMethod.verified = false;//this.getFormFieldValue('email');
    console.log(this.getFormFieldValue('paymentMethod'));

    var query = {paymentMethod: billingMethod.paymentMethod, user_id: billingMethod.user_id};
    this.dbservice.createBillingMethod(billingMethod,query).then((data) => {
      console.log(data);
      this.committed = true;
    });
    
  }

  get user() { return this.billingMethodForm.get('user'); }

  getFormFieldValue(fieldname): any { 
    return this.billingMethodForm.get(fieldname).value; 
  }


}
