import { Component, ElementRef, ViewChild, Input, OnInit, OnChanges, ɵinternalCreateApplication } from '@angular/core';
import H from '@here/maps-api-for-javascript';
import { coordinates } from '../shared/models/coordinates.model';

@Component({
  selector: 'app-jsmap',
  templateUrl: './jsmap.component.html',
  styleUrls: ['./jsmap.component.css']
})
export class JsmapComponent implements OnChanges {
  private redSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="b" d="M34.25 31.652A19.015 19.015 0 0 0 39 19.06C39 8.549 30.478 0 20 0S1 8.55 1 19.059c0 4.823 1.795 9.233 4.75 12.593L19.975 46 34.25 31.652z"/><path id="a" d="M34.25 31.652A19.015 19.015 0 0 0 39 19.06C39 8.549 30.478 0 20 0S1 8.55 1 19.059c0 4.823 1.795 9.233 4.75 12.593L19.975 46 34.25 31.652z"/><mask id="c" width="38" height="46" x="0" y="0" fill="#fff"><use xlink:href="#a"/></mask></defs><g fill="none" fill-rule="evenodd"><ellipse cx="20" cy="45.16" fill="#FFF" stroke="#979797" stroke-width=".25" rx="3.5" ry="3.5"/><use fill="#FF0100" xlink:href="#b"/><path fill="#9D0101" fill-opacity=".5" d="M11.81 37.66h16.38l-8.2 8z"/><use stroke="#416A86" stroke-width=".5" mask="url(#c)" xlink:href="#a"/><ellipse cx="19.81" cy="19.19" fill="#FFF" rx="4.81" ry="4.81"/></g></svg>'
  private greenSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="b" d="M34.25 31.652A19.015 19.015 0 0 0 39 19.06C39 8.549 30.478 0 20 0S1 8.55 1 19.059c0 4.823 1.795 9.233 4.75 12.593L19.975 46 34.25 31.652z"/><path id="a" d="M34.25 31.652A19.015 19.015 0 0 0 39 19.06C39 8.549 30.478 0 20 0S1 8.55 1 19.059c0 4.823 1.795 9.233 4.75 12.593L19.975 46 34.25 31.652z"/><mask id="c" width="38" height="46" x="0" y="0" fill="#fff"><use xlink:href="#a"/></mask></defs><g fill="none" fill-rule="evenodd"><ellipse cx="20" cy="45.16" fill="#FFF" stroke="#979797" stroke-width=".25" rx="3.5" ry="3.5"/><use fill="#01B6B2" xlink:href="#b"/><path fill="#323232" fill-opacity=".5" d="M11.81 37.66h16.38l-8.2 8z"/><use stroke="#416A86" stroke-width=".5" mask="url(#c)" xlink:href="#a"/><ellipse cx="19.81" cy="19.19" fill="#FFF" rx="4.81" ry="4.81"/></g></svg>'
  private yellowSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="b" d="M34.25 31.652A19.015 19.015 0 0 0 39 19.06C39 8.549 30.478 0 20 0S1 8.55 1 19.059c0 4.823 1.795 9.233 4.75 12.593L19.975 46 34.25 31.652z"/><path id="a" d="M34.25 31.652A19.015 19.015 0 0 0 39 19.06C39 8.549 30.478 0 20 0S1 8.55 1 19.059c0 4.823 1.795 9.233 4.75 12.593L19.975 46 34.25 31.652z"/><mask id="c" width="38" height="46" x="0" y="0" fill="#fff"><use xlink:href="#a"/></mask></defs><g fill="none" fill-rule="evenodd"><ellipse cx="20" cy="45.16" fill="#FFF" stroke="#979797" stroke-width=".25" rx="3.5" ry="3.5"/><use fill="#E8E113" xlink:href="#b"/><path fill="#9D0101" fill-opacity=".5" d="M11.81 37.66h16.38l-8.2 8z"/><use stroke="#416A86" stroke-width=".5" mask="url(#c)" xlink:href="#a"/><ellipse cx="19.81" cy="19.19" fill="#FFF" rx="4.81" ry="4.81"/></g></svg>'
  private bluekSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="b" d="M34.25 31.652A19.015 19.015 0 0 0 39 19.06C39 8.549 30.478 0 20 0S1 8.55 1 19.059c0 4.823 1.795 9.233 4.75 12.593L19.975 46 34.25 31.652z"/><path id="a" d="M34.25 31.652A19.015 19.015 0 0 0 39 19.06C39 8.549 30.478 0 20 0S1 8.55 1 19.059c0 4.823 1.795 9.233 4.75 12.593L19.975 46 34.25 31.652z"/><mask id="c" width="38" height="46" x="0" y="0" fill="#fff"><use xlink:href="#a"/></mask></defs><g fill="none" fill-rule="evenodd"><ellipse cx="20" cy="45.16" fill="#FFF" stroke="#979797" stroke-width=".25" rx="3.5" ry="3.5"/><use fill="#235ADED4" xlink:href="#b"/><path fill="#fac" fill-opacity=".5" d="M11.81 37.66h16.38l-8.2 8z"/><use stroke="#416A86" stroke-width=".5" mask="url(#c)" xlink:href="#a"/><ellipse cx="19.81" cy="19.19" fill="#FFF" rx="4.81" ry="4.81"/></g></svg>'

  redIcon = new H.map.Icon(this.redSvg)
  greenIcon = new H.map.Icon(this.greenSvg)
  yellowIcon = new H.map.Icon(this.yellowSvg)
  blueIcon = new H.map.Icon(this.bluekSvg)

  private map: any;
  private defaultLayers: any;
  InitializeMap() {
    var platform = new H.service.Platform({
      // Place your API key here.
      apikey: "--Key--"
    });
    this.defaultLayers = platform.createDefaultLayers() as any;
    this.map = new H.Map(
      this.mapDiv?.nativeElement, this.defaultLayers.vector.normal.map, {
      center: { lat: 28.5535, lng: 77.2588 },
      zoom: 4,
      pixelRatio: window.devicePixelRatio || 1
    });
  }

  @Input() coord!: coordinates;

  @ViewChild('map') mapDiv?: ElementRef;

  private listOfObjects: any = []

  ngAfterViewInit(): void {

    this.InitializeMap()

    window.addEventListener('resize', () => this.map.getViewPort().resize());

    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

    var ui = H.ui.UI.createDefault(this.map, this.defaultLayers);
  }

  colorHelper(val: number) {
    if (val == 0)
      return this.greenIcon
    else if (val == 1)
      return this.yellowIcon
    else if (val == 2)
      return this.redIcon
    else
      return this.blueIcon
  }

  ngOnChanges(): void {

    this.listOfObjects.forEach((x: any) => {
      this.map.removeObject(x)
    })

    console.log(this.coord)
    var latitudes = this.coord.position_lat
    var longitudes = this.coord.position_lng
    var cluster = this.coord.Cluster
    var total_loc = latitudes.length

    var marker = new H.map.Marker({ lat: latitudes[total_loc - 1], lng: longitudes[total_loc - 1] }, { data: 'Target Location', icon: this.blueIcon })
    this.map.addObject(marker)
    this.listOfObjects.push(marker)
    latitudes.pop()
    longitudes.pop()

    for (let i = 0; i < latitudes.length; i++) {
      var marker = new H.map.Marker({ lat: latitudes[i], lng: longitudes[i] }, { data: '', icon: this.colorHelper(cluster[i]) })
      this.listOfObjects.push(marker)
      this.map.addObject(marker)
    }

    // var current_lat = this.coord.current_lat
    // var current_long = this.coord.current_long

    // var curentLocMarker = new H.map.Marker({ lat: current_lat, lng: current_long }, { data: '', icon: this.colorHelper(3) })
    // this.listOfObjects.push(curentLocMarker)
    // this.map.addObject(curentLocMarker)


  }

}
