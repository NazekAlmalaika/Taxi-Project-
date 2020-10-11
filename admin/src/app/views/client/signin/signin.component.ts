import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Validators} from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { User } from 'app/models/user';
import { DbService } from 'app/services/db.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable, throwError } from "rxjs";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  serverErrorMessages: string='';
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  model={
    email:'',
    password:''
  };
 
  constructor(private service: DbService, private router:Router) { }
  
  ngOnInit() {
  }
  login(form:NgForm){
    this.service.login(form.value).subscribe(
      res=>{
        this.service.setToken(res['token']);
        this.router.navigateByUrl('/booking-management');
        this.resetForm(form);
      }, 
      err=>{
        this.serverErrorMessages = err.error.message;
        
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
