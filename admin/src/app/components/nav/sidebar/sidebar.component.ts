import { Component, OnInit } from '@angular/core';

import { RouterModule, Router } from '@angular/router';


declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/rider-management',       title: 'Rider Management',  icon:'person', class: ''  },
    { path: '/driver-management',        title: 'Driver Management',  icon:'person', class: ''  },
    { path: '/booking-management',        title: 'Booking Management',  icon:'book', class: ''}
  
  
    
   
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
