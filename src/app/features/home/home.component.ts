import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {} from 'googlemaps';
import { MapStylesModel } from './models/map-styles-model';
import { CoordsModel } from './models/coords-model';
import { DataModel } from './models/data-model';


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
  dataModel;
  data: any;
  display: boolean;
  detailView: boolean;
  mapView: boolean;
  tableView: boolean;
  testData = 'hello';
  mIcon = {
    path: google.maps.SymbolPath.CIRCLE,
    fillOpacity: 1,
    fillColor: '#E80000',
    strokeOpacity: 1,
    strokeWeight: 1,
    strokeColor: '#E80000',
    opacity: 0.6,
    scale: 18
  };
  mIcon2 = {
    path: google.maps.SymbolPath.CIRCLE,
    fillOpacity: 1,
    fillColor: '#3CB371',
    strokeOpacity: 1,
    strokeWeight: 1,
    strokeColor: '#3CB371',
    opacity: 0.6,
    scale: 18
  };


  constructor() {
    this.mapStyles = new MapStylesModel();
    this.coordsModel = new CoordsModel();
    this.dataModel = new DataModel();
    Window['homeComponent'] = this;
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
   const markers = [
      {
        position: new google.maps.LatLng(39.468739, -98.950631),
        map: this.map,
        title: 'Number 123',
        content: `<div style="width:310px"><span style="padding-left:2.5%;font-size:22px;font-weight:bolder;float:left;width:80%">${this.dataModel.dataDTO[0].locationName}</span>
                  <div style="width:42%;display:inline-block;padding:1%3%5%3%;float:left">
                    <div style="width:100%;padding-top:5px;font-size:16px">Inbound</div>
                    <div style="width:130px;padding-bottom:10px">
                      <div style="margin-top:5px;width:121px;background:#3CB371;height:2px;float:left"></div>
                      <div style="width:0;height:0;border-top:6px solid transparent;border-bottom: 6px solid transparent;border-left:9px solid #3CB371;float:right"></div>
                    </div>
                    <div style="width:100%;padding-top:5px">Empty Actual<div style="float:right;font-weight:bold">423</div></div>
                    <div style="width:100%;padding-top:5px">Empty Projected<div style="float:right;font-weight:bold">554</div></div>
                    <div style="width:100%;padding-top:5px">Loaded Actual<div style="float:right;font-weight:bold">224</div></div>
                    <div style="width:100%;padding-top:5px">Loaded Projected<div style="float:right;font-weight:bold">124</div></div>
                    <div style="width:55%;float:right;padding-top:10px;font-size:14px;font-weight:bold">Total 1562</div>
                  </div>
                  <div style="width:42%;display:inline-block;padding:1%3%5%3%;float:right">
                    <div style="width:100%;padding-top:5px;font-size:16px">Outbound</div>
                    <div style="width:130px;padding-bottom:10px">
                      <div style="margin-top:5px;width:121px;background:#E80000;height:2px;float:left"></div>
                      <div style="width:0;height:0;border-top:6px solid transparent;border-bottom: 6px solid transparent;border-left:9px solid #E80000;float:right"></div>
                    </div>
                    <div style="width:100%;padding-top:5px">Empty Actual<div style="float:right;font-weight:bold">764</div></div>
                    <div style="width:100%;padding-top:5px">Empty Projected<div style="float:right;font-weight:bold">754</div></div>
                    <div style="width:100%;padding-top:5px">Loaded Actual<div style="float:right;font-weight:bold">234</div></div>
                    <div style="width:100%;padding-top:5px">Loaded Projected<div style="float:right;font-weight:bold">123</div></div>
                    <div style="width:55%;float:right;padding-top:10px;font-size:14px;font-weight:bold">Total 1343</div>
                  </div>
                  <span style="float:right;padding-right:2%"><button style="background-color:#236093;color:white;border:none;border-radius:6px;height:25px" onclick="Window.homeComponent.showDetails()">Details</button></span>
                  </div>`,
        icon: this.mIcon,
        label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
          text: '-54'}
      },
      {
        position: new google.maps.LatLng(43.469739, -92.951631),
        map: this.map,
        title: 'Number -12',
        icon: this.mIcon2,
        label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
          text: '+120'}
      }
    ];
   markers.forEach(markerInfo => {
      const marker = new google.maps.Marker({
        ...markerInfo
      });
      const infoWindow = new google.maps.InfoWindow({
        content: markerInfo.content
      });
      marker.addListener('click', () => {
        infoWindow.open(marker.getMap(), marker);
      });
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

  showDetails(): void {
    this.detailView = !this.detailView;
  }


}
