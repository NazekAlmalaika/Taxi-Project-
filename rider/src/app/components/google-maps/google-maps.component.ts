import { Component, OnInit } from '@angular/core';
import { Input, Renderer2, ElementRef, Inject } from '@angular/core';
//import { DOCUMENT } from '@angular/platform-browser';
import { Plugins } from '@capacitor/core';
import { DOCUMENT } from '@angular/common';
const { Geolocation, Network } = Plugins;
declare var google; 

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit {

    @Input('apiKey') apiKey: string;
    @Input('sourceLocationPlaceId') sourceLocationPlaceId: any;
    @Input('destinationLocationPlaceId') destinationLocationPlaceId : any;
    @Input('displayroute') displayroute :boolean;

    public map: any;
    public markers: any[] = [];
    private mapsLoaded: boolean = false;
    private networkHandler = null;

    constructor(private renderer: Renderer2, private element: ElementRef, @Inject(DOCUMENT) private _document){

    }

    ngOnInit(){

        this.init().then((res) => {
            console.log("Google Maps ready.");
            
        }, (err) => {    
            console.log(err);
        });

    }

    ngDoCheck(){
     
    }

    async createroute(){
        console.log(this.sourceLocationPlaceId);
        console.log(this.destinationLocationPlaceId);
        const sourcePlace : any = await this.getPlaceDetails(this.sourceLocationPlaceId);
        const destinationPlace : any = await this.getPlaceDetails(this.destinationLocationPlaceId);
        console.log("finished");
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(this.map);
        if(sourcePlace && destinationPlace){
          let sourceLatLng = new google.maps.LatLng({lat: sourcePlace.geometry.location.lat, lng: sourcePlace.geometry.location.lng}); 
          let destinationLatLng = new google.maps.LatLng({lat: destinationPlace.geometry.location.lng, lng: destinationPlace.geometry.location.lng}); 
          this.displayRoute(sourceLatLng,destinationLatLng,directionsService,directionsRenderer)
        }
      
    }

    getPlaceDetails(location){
      let service = new google.maps.places.PlacesService(this.map);
      return new Promise( function( resolve, reject ) {
        var request = {
          placeId: location,
          fields: ['name', 'rating', 'formatted_phone_number', 'geometry']
        };
        service.getDetails(request, function(place, status) {
          //placeDetails = JSON.stringify(results);
          // Do something with 'results'
          // Then do a few more things...
          console.log(JSON.stringify(place));
          
          resolve(  JSON.parse(JSON.stringify(place)) ) // or reject( 'optional parameter to be passed to error handler ".catch()"' )
        });
      });
    }

    ngOnChanges(){
        console.log("booooooooooooooom ngOnChanges");
        if (this.displayroute){
          this.createroute();
        }
    }

    private init(): Promise<any> {

        return new Promise((resolve, reject) => {
            this.initMap().then((res) => {
                resolve(true);
            }, (err) => {
                reject(err);
            });  
        });

    }


    private initMap(): Promise<any> {

        return new Promise((resolve, reject) => {

            Geolocation.getCurrentPosition().then((position) => {

                console.log(position);

                let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                let mapOptions = {
                    center: latLng,
                    zoom: 15
                };

                console.log(this.element.nativeElement);
                this.element.nativeElement.style = {};
                console.log(this.element.nativeElement);

                
                this.map = new google.maps.Map(this._document.getElementById('map'), mapOptions);
                let defaultMap = this.map;

                const directionsService = new google.maps.DirectionsService();
                const directionsRenderer = new google.maps.DirectionsRenderer({
                  draggable: true,
                  defaultMap,
                  panel: document.getElementById("right-panel") as HTMLElement
                });
                /* 
                directionsRenderer.addListener("directions_changed", () => {
                  this.computeTotalDistance(directionsRenderer.getDirections());
                });*/
              
                /*this.displayRoute(
                  "Perth, WA", 
                  "Sydney, NSW",
                  directionsService,
                  directionsRenderer
                );*/
                resolve(true);

            }, (err) => {

                reject('Could not initialise map');

            });

        });

    }

   
    displayRoute(
      origin: any,
      destination: any,
      service: any,
      display: any
    ) {
      service.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
          avoidTolls: true
        },
        (
          result: any,
          status: any
        ) => {
          if (status === "OK") {
            display.setDirections(result);
          } else {
            //alert("Could not display directions due to: " + status);
          }
        }
      );
    }

    computeTotalDistance(result: any) {
      let total = 0;
      const myroute = result.routes[0];

      for (let i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
      }
      total = total / 1000;
      (document.getElementById("total") as HTMLElement).innerHTML = total + " km";
    }

    public addMarker(lat: number, lng: number): void {

        let latLng = new google.maps.LatLng(lat, lng);

        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });

        this.markers.push(marker);

    }

}