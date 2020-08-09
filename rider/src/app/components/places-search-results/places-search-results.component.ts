import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'


@Component({
  selector: 'app-places-search-results',
  templateUrl: './places-search-results.component.html',
  styleUrls: ['./places-search-results.component.scss'],
})
export class PlacesSearchResultsComponent implements OnInit {


  @Input('isSearchLocationAvailable') isSearchLocationAvailable: boolean;
  @Input('searchLocations') searchLocations: any;

  constructor() { 
  }

  ngOnInit() { 
    console.log(this.isSearchLocationAvailable);
    console.log(this.searchLocations);
  }

  onLocationResultSelect(location){
    this.isSearchLocationAvailable = false;
    this.searchLocations = [];
    var request = {
      placeId: location.place_id,
      fields: ['name', 'rating', 'formatted_phone_number', 'geometry']
    };
    
    //let service = new google.maps.places.PlacesService();
    /*service.getDetails(request, callback);
    
    function callback(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        //createMarker(place);
      }
    }*/
    console.log(location);
  }

}
