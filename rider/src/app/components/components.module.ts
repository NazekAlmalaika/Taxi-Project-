import { NgModule } from '@angular/core';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { SearchInMapsComponent } from './search-in-maps/search-in-maps.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { PlacesSearchResultsComponent } from './places-search-results/places-search-results.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from './explore-container/explore-container.component';

@NgModule({
  declarations: [
    GoogleMapsComponent,
    SearchInMapsComponent,
    PlacesSearchResultsComponent,
    ExploreContainerComponent
  ],
  exports: [
    GoogleMapsComponent,
    SearchInMapsComponent,
    PlacesSearchResultsComponent,
    ExploreContainerComponent
  ],
  imports: [
    CommonModule, 
    FormsModule,
    IonicModule,
    FontAwesomeModule
  ]
})
export class ComponentsModule {}