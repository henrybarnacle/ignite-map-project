import { Component, OnInit, ViewChild } from '@angular/core';
import {} from 'googlemaps';
import { MapStylesModel } from './models/map-styles-model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('map') mapElement: any;
  map: google.maps.Map;
  mapStyles;

  constructor() {
    this.mapStyles = new MapStylesModel();
  }




  ngOnInit(): void {
    setTimeout(() => {
      const mapProperties = {
        center: new google.maps.LatLng(39.468739, -98.950631),
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: this.mapStyles.style
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    }, 3000);

  }

}
