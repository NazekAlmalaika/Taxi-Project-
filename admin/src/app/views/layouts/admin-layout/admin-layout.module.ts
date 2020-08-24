import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';


import { RiderManagementComponent } from '../../../views/rider-management/rider-management.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DriverManagementComponent } from 'app/views/driver-management/driver-management.component';
import { BillingManagementComponent } from 'app/views/billing-management/billing-management.component';
import { BookingManagementComponent } from 'app/views/booking-management/booking-management.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgxPaginationModule,
    MatDialogModule
  ],
  declarations: [
    RiderManagementComponent,
    DriverManagementComponent,
    BillingManagementComponent,
    BookingManagementComponent
  ]
})

export class AdminLayoutModule {}
