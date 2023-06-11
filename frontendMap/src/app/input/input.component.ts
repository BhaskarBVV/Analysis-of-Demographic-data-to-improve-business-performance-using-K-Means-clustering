import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ServicesService } from '../services.service';
import { coordinates } from '../shared/models/coordinates.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  constructor(private service: ServicesService) { }



  lat = ""
  long = ""

  @Output() newEvent = new EventEmitter<coordinates>;

  coordinates: coordinates = {
    Cluster: [],
    Department_Stores: [],
    Gyms: [],
    cafe: [],
    position_lat: [],
    position_lng: []
  }

  ngOnInit(): void {

  }

  printFunc() {
    console.log(this.lat, this.long)
  }

  setValue(val: any) {
    this.lat = val.target.parentNode.children[1].value
    this.long = val.target.parentNode.children[3].value
    console.log(this.lat, this.long)

    this.service.getCoordinates(this.lat, this.long).subscribe(data => {
      this.coordinates = data
      this.newEvent.emit(this.coordinates)
      console.log(this.coordinates);
    })
  }
}
