import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { User } from 'app/models/user';
import { DbService } from 'app/services/db.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private service: DbService, private router:Router) { }

  serverErrorMessages: string='';
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  ngOnInit() {
  }
  forgetPassword(email){
    
    // console.log("loggedIn = " + this.loggedIn );
     this.service.forgetPassword(email);
     this.serverErrorMessages=this.service.serverErrorMessages;
     
   }

}
