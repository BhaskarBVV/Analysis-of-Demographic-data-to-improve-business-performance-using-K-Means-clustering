import { Component } from '@angular/core';
import { coordinates } from './shared/models/coordinates.model';
import { Conditional } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontendMap';
  coord: coordinates = {
    Cluster: [],
    Department_Stores: [],
    Gyms: [],
    cafe: [],
    position_lat: [],
    position_lng: []
  };

  setCordinates(event: coordinates) {
    this.coord = event
    console.log(this.coord)
  }

}
