import { Component, OnInit } from '@angular/core';
import { NgForm, Validators,FormControl, FormGroupDirective, ValidatorFn   } from '@angular/forms';
import { Routes } from '@angular/router';
import { User } from 'app/models/user';
import { DbService } from 'app/services/db.service';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userInfo:User[]=[];
  showSuccessMessage: boolean;
  serverErrorMessages: string;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  constructor(private service: DbService) { }
  menuItems: any[];
  ngOnInit() {
   
  }
  postUser(form: NgForm){
    this.service.postUser(form.value).subscribe(
      res =>{
        this.showSuccessMessage=true;
        setTimeout(()=> this.showSuccessMessage =false,4000);
        this.resetForm(form);
        this.userInfo=form.value;
      }, 
      err=>{
        if(err.status==422){
       
         this.serverErrorMessages = err.error.message;
         
          
        }else{
          this.serverErrorMessages='Something went wrong, please contact admin...';
          
        }
      }
    )
   }
   resetForm(form: NgForm){
    this.service.selectedUser={
      name: "",
      email: "",
      password: "",
      _id: "",
      createdBy: "",
      active: false,
      mobileNumber: 0,
      region: "",
      onilne: false,
      address: "",
      billing_id: "",
      billingMethods_id: [""],
      bookings_id: [""],
      defaultBillingMethod_id: "",
      emailToken: "",
      isVerified: false,
    };
    form.resetForm();
    this.serverErrorMessages='';

  }
}
