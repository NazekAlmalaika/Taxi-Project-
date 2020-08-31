import { Component, ViewChild, NgZone } from '@angular/core';
import { GoogleMapsComponent } from '../../components/google-maps/google-maps.component';

import { ModalController, IonSearchbar, IonList, MenuController, IonMenu } from '@ionic/angular';
import { SearchInMapsComponent } from '../../components/search-in-maps/search-in-maps.component';
import { PlacesSearchResultsComponent } from '../../components/places-search-results/places-search-results.component';

declare var google; 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  
  @ViewChild(GoogleMapsComponent) mapComponent: GoogleMapsComponent;
  @ViewChild('searchbar') searchbar: IonSearchbar;
  @ViewChild('ionlist') ionlist: IonList;
  @ViewChild('menu') menu: IonMenu;

  location: any;
  autoCompleteService: any;
  isSearchLocationAvailable: boolean = false;
  searchLocations: any = [];
  searchText: string;

  sourceLocation: string;
  destinationLocation: string;
  sourceLocationPlaceId: string;
  destinationLocationPlaceId: string;
  displayroute = false;

  constructor(public modalController: ModalController, private menuController: MenuController) {
    this.autoCompleteService = new google.maps.places.AutocompleteService();
  }

  openFirst() {
    console.log("click ionic menu");
    //this.menuController.enable(true, 'first');
    //this.menuController.open('first');
    this.menu.open(true);
  }

  close() {
    console.log("click ionic menu");
    //this.menuController.enable(true, 'first');
    //this.menuController.open('first');
    this.menu.close(true);
  }

  async presentModal(type) {
    console.log("haloooo modal");
    const modal = await this.modalController.create({
      component: SearchInMapsComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    

    if( type == "source" && data.selectedLocation) {
      this.sourceLocation = data.selectedLocation.description;
      this.sourceLocationPlaceId  = data.selectedLocation.place_id;
      console.log(data);
    } else if(type == "destination" && data.selectedLocation) {
      this.destinationLocationPlaceId = data.selectedLocation.place_id; 
      this.destinationLocation = data.selectedLocation.description;
      console.log(data);
    }

    if( this.sourceLocationPlaceId  && this.destinationLocationPlaceId) {
        this.displayroute = true;
        
    }
    
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });

    //const { data } = await modal.onWillDismiss();
    //console.log(data);
  }

  public searchLocation(type){
    console.log("haloooo");
    console.log(type);
    this.presentModal(type);
  }

  public searchDestination(){

  }

  ngAfterViewInit(){

  }

  testMarker(){

      let center = this.mapComponent.map.getCenter();
      this.mapComponent.addMarker(center.lat(), center.lng());

  }

}
