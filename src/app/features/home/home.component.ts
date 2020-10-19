import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {} from 'googlemaps';
import { MapStylesModel } from './models/map-styles-model';
import { CoordsModel } from './models/coords-model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit{

  @ViewChild('map') mapElement: any;

  map: google.maps.Map;
  mapStyles;
  coordsModel;
  data: any;
  display: boolean;
  detailView: boolean;
  mapView: boolean;
  tableView: boolean;
  mIcon = {
    path: google.maps.SymbolPath.CIRCLE,
    fillOpacity: 1,
    fillColor: 'red',
    strokeOpacity: 1,
    strokeWeight: 1,
    strokeColor: 'red',
    scale: 18
  };
  mIcon2 = {
    path: google.maps.SymbolPath.CIRCLE,
    fillOpacity: 1,
    fillColor: '#3CB371',
    strokeOpacity: 1,
    strokeWeight: 1,
    strokeColor: '#3CB371',
    scale: 18
  };
  markers = [
    {
      position: new google.maps.LatLng(39.468739, -98.950631),
      map: this.map,
      title: 'Number 123',
      content: `<div>Inbound</div><div>outbound</div>`,
      icon: this.mIcon,
      label: {color: '#FFF', fontSize: '12px', fontWeight: '600',
        text: '-23'}
    },
    {
      position: new google.maps.LatLng(43.469739, -92.951631),
      map: this.map,
      title: 'Number -12',
      icon: this.mIcon2,
      label: {color: '#FFF', fontSize: '12px', fontWeight: '600',
        text: '12'}
    }
  ];

  constructor() {
    this.mapStyles = new MapStylesModel();
    this.coordsModel = new CoordsModel();
  }

  ngOnInit(): void {
    this.mapView = true;
  }

  ngAfterViewInit(): void {
    this.loadMap();
  }

  loadMap(): void {
    const mapProperties = {
      center: new google.maps.LatLng(39.468739, -98.950631),
      zoom: 4.7,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: this.mapStyles.style
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    this.loadAllMarkers();
    this.setRegions();
  }

  showMap(): void {
    this.tableView = false;
    this.mapView = true;
    setTimeout(() => {
      this.loadMap();
    }, 1000);
  }

  showTable(): void {
    this.mapView = false;
    this.tableView = true;
  }
  showFilters(): void {

  }
  loadAllMarkers(): void {
    this.markers.forEach(markerInfo => {
      // Creating a new marker object
      const marker = new google.maps.Marker({
        ...markerInfo
      });
      // creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: markerInfo.content
      });

      // Add click event to open info window on marker
      marker.addListener('click', () => {
        infoWindow.open(marker.getMap(), marker);
      });

      // Adding marker to google map
      marker.setMap(this.map);
    });
  }

  setRegions(): void {
  const southWest = new google.maps.Polygon({
    paths: this.coordsModel.southWestCoords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.15,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.15,
  });
  const northWest = new google.maps.Polygon({
    paths: this.coordsModel.northWestCoords,
    strokeColor: 'green',
    strokeOpacity: 0.15,
    strokeWeight: 2,
    fillColor: 'green',
    fillOpacity: 0.15,
  });
  const midWest = new google.maps.Polygon({
    paths: this.coordsModel.midWestCoords,
    strokeColor: 'orange',
    strokeOpacity: 0.15,
    strokeWeight: 2,
    fillColor: 'orange',
    fillOpacity: 0.15,
  });
  const central = new google.maps.Polygon({
    paths: this.coordsModel.centralCoords,
    strokeColor: '#40E0D0',
    strokeOpacity: 0.15,
    strokeWeight: 2,
    fillColor: '#40E0D0',
    fillOpacity: 0.15,
  });
  const southCentral = new google.maps.Polygon({
    paths: this.coordsModel.southCentralCoords,
    strokeColor: 'yellow',
    strokeOpacity: 0.15,
    strokeWeight: 2,
    fillColor: 'yellow',
    fillOpacity: 0.15,
  });
  const northEast = new google.maps.Polygon({
    paths: this.coordsModel.northEastCoords,
    strokeColor: '#ADFF2F',
    strokeOpacity: 0.15,
    strokeWeight: 2,
    fillColor: '#ADFF2F',
    fillOpacity: 0.15,
  });
  const southEast = new google.maps.Polygon({
    paths: this.coordsModel.southEastCoords,
    strokeColor: 'blue',
    strokeOpacity: 0.15,
    strokeWeight: 2,
    fillColor: 'blue',
    fillOpacity: 0.15,
  });
  southWest.setMap(this.map);
  northWest.setMap(this.map);
  midWest.setMap(this.map);
  central.setMap(this.map);
  southCentral.setMap(this.map);
  northEast.setMap(this.map);
  southEast.setMap(this.map);
  }


}
