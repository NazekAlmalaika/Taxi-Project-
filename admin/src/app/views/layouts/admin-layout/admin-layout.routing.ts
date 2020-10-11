import { Routes } from "@angular/router";
import { RiderManagementComponent } from "../../rider-management/rider-management.component";
import { DriverManagementComponent } from "app/views/driver-management/driver-management.component";
import { BookingManagementComponent } from "app/views/booking-management/booking-management.component";
import { BillingManagementComponent } from "app/views/billing-management/billing-management.component";
import{SigninComponent} from 'app/views/client/signin/signin.component';
import{SignupComponent} from 'app/views/client/signup/signup.component';
import {ForgetPasswordComponent} from 'app/views/client/forget-password/forget-password.component';
import {ClientComponent} from 'app/views/client/client.component';



export const AdminLayoutRoutes: Routes = [
  // {
  //   path: '',
  //   children: [ {
  //     path: 'dashboard',
  //     component: DashboardComponent
  // }]}, {
  // path: '',
  // children: [ {
  //   path: 'userprofile',
  //   component: UserProfileComponent
  // }]
  // }, {
  //   path: '',
  //   children: [ {
  //     path: 'icons',
  //     component: IconsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'notifications',
  //         component: NotificationsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'maps',
  //         component: MapsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'typography',
  //         component: TypographyComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'upgrade',
  //         component: UpgradeComponent
  //     }]
  // }
  { path: "rider-management", component: RiderManagementComponent },
  { path: "driver-management", component: DriverManagementComponent },
  { path: "booking-management", component: BookingManagementComponent },
  { path: "billing-management", component: BillingManagementComponent },
  { path:"forget-password", component: ForgetPasswordComponent},
  { path:"signup", component: SignupComponent},
  { path:"signin", component: SigninComponent},
  { path:"client", component: ClientComponent}
];
