import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private httpClient: HttpClient) { }

  getCoordinates(lat: string, long: string) {
    return this.httpClient.get<any>(`http://127.0.0.1:5000/Locations/${lat}/${long}`)
  }



}
