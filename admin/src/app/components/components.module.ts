import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';

import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


import { FooterComponent } from "./nav/footer/footer.component";
import { NavbarComponent } from "./nav/navbar/navbar.component";
import { SidebarComponent } from "./nav/sidebar/sidebar.component";
import { CreateRiderFormComponent } from "./forms/create-rider-form/create-rider-form.component";
import { MatDialogModule } from "@angular/material/dialog";
import { NgxPaginationModule } from "ngx-pagination";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRippleModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CheckMarkAnimatedComponent } from "./shared/check-mark-animated/check-mark-animated.component";
import { CreateBillingMethodFormComponent } from "./forms/create-billing-method-form/create-billing-method-form.component";
import { MatTabsModule } from "@angular/material/tabs";
import { CreateDriverFormComponent } from "./forms/create-driver-form/create-driver-form.component";
import { CreateBookingFormComponent } from "./forms/create-booking-form/create-booking-form.component";
import {SignupComponent} from '../views/client/signup/signup.component';
import {SigninComponent} from '../views/client/signin/signin.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgxPaginationModule,
    MatDialogModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    CreateRiderFormComponent,
    CheckMarkAnimatedComponent,
    CreateBillingMethodFormComponent,
    CreateBookingFormComponent,
    CreateDriverFormComponent,
    SignupComponent,
    SigninComponent
  ],
  exports: [FooterComponent, NavbarComponent, SidebarComponent],
})
export class ComponentsModule {}
