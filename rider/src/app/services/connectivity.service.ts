import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';


declare var Connection;

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  
  onDevice: boolean;

  constructor(public platform: Platform){
    
  }

 
}
