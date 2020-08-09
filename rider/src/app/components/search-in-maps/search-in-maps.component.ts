import { Component, OnInit, Input, ViewChild, NgZone } from '@angular/core';
import { ModalController, IonSearchbar } from '@ionic/angular';
import { Renderer2, ElementRef, Inject } from '@angular/core';
//import { DOCUMENT } from '@angular/platform-browser';
import { Plugins } from '@capacitor/core';
import { DOCUMENT } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'

declare var google; 

@Component({
  selector: 'app-search-in-maps',
  templateUrl: './search-in-maps.component.html',
  styleUrls: ['./search-in-maps.component.scss'],
})
export class SearchInMapsComponent implements OnInit {


  // Data passed in by componentProps
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;
  @Input() map: any;
  @ViewChild('searchbar') searchbar: IonSearchbar;

  autoCompleteService: any;
  isSearchLocationAvailable: boolean = false;
  searchLocations: any = [];
  location : any;
  searchText: string;

  constructor(public modalController: ModalController,
    private renderer: Renderer2, 
    private element: ElementRef, 
    @Inject(DOCUMENT) private _document,
    private ngZone: NgZone) { 

      this.autoCompleteService = new google.maps.places.AutocompleteService();

  }

  ngOnInit() {

    
  }

  ngAfterViewInit(){
    this.initAutocomplete();
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  initAutocomplete() {
    
  }

  onLocationResultSelect(location){
    this.location = location;
    this.isSearchLocationAvailable = false;
    this.searchLocations = [];
    
    this.modalController.dismiss({
      'dismissed': true,
      selectedLocation: this.location
    });
    console.log(location);
  }

  searchGoogleMaps(event){
    if( !this.searchText){
      return
    }
    let pageCtx = this;
    var displaySuggestions = function(predictions, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        //alert(status);
        return;
      }
      if(predictions.length > 0 ) {
        pageCtx.isSearchLocationAvailable = true;
        pageCtx.searchLocations = [];
        predictions.forEach(function(prediction,index) {
          if(index>4){
            return
          }
          //var li = document.createElement('li');
          //li.appendChild(document.createTextNode(prediction.description));
          //document.getElementById('results').appendChild(li);
          pageCtx.searchLocations.push(prediction);
          //console.log(prediction);
        });
        
      }
      else{
        pageCtx.isSearchLocationAvailable = false;
        pageCtx.searchLocations = [];
      }
      
    };
    //this.ngZone.run(() => {
      this.autoCompleteService.getQueryPredictions({ input: this.searchText}, displaySuggestions);
    //});
    

  }

}
