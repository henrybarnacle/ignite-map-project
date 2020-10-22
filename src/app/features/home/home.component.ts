import {
  AfterViewInit, Component, OnInit, ViewChild,
  NgModule, Injector, ApplicationRef, ComponentFactoryResolver,
  NgZone, ElementRef, ComponentRef, OnDestroy
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {} from 'googlemaps';
import { MapStylesModel } from './models/map-styles-model';
import { CoordsModel } from './models/coords-model';
import { DataModel } from './models/data-model';
import { RampInfoComponent } from './ramp-info/ramp-info.component';
import { RampInfoService } from './services/ramp-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild('map') mapElement: ElementRef;

  map: google.maps.Map;
  infoWindow: any;
  compRef: ComponentRef<RampInfoComponent>;
  mapStyles;
  coordsModel;
  dataModel;
  data: any;
  displayFilters: boolean;
  displayReposition: boolean;
  detailView: boolean;
  mapView: boolean;
  tableView: boolean;

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
  markers = [
    {
      position: new google.maps.LatLng(39.468739, -98.950631),
      map: this.map,
      title: 'Number 123',
      content: {
        igniteZoneRampName: 'Kansas City',
        emptyActualCount: 123,
        loadedActualCount: 443,
        loadedprojectedCount: 222,
        emptyProjectedCount: 76
      },
      icon: this.mIcon,
      label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
        text: '-54'}
    },
    {
      position: new google.maps.LatLng(43.469739, -92.951631),
      map: this.map,
      title: 'Number -12',
      content: {
        igniteZoneRampName: 'Cedar Rapids',
        emptyActualCount: 163,
        loadedActualCount: 743,
        loadedprojectedCount: 154,
        emptyProjectedCount: 336
      },
      icon: this.mIcon,
      label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
        text: '+120'}
    },
    {
      position: new google.maps.LatLng(47.626738, -121.982783),
      map: this.map,
      title: 'Number -12',
      content: {
        igniteZoneRampName: 'Cedar Rapids',
        emptyActualCount: 163,
        loadedActualCount: 743,
        loadedprojectedCount: 154,
        emptyProjectedCount: 336
      },
      icon: this.mIcon,
      label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
        text: '+120'}
    },
    {
      position: new google.maps.LatLng(33.859271, -117.720087),
      map: this.map,
      title: 'Number -12',
      content: {
        igniteZoneRampName: 'Cedar Rapids',
        emptyActualCount: 163,
        loadedActualCount: 743,
        loadedprojectedCount: 154,
        emptyProjectedCount: 336
      },
      icon: this.mIcon2,
      label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
        text: '+120'}
    },
    {
      position: new google.maps.LatLng(41.728512, -87.749386),
      map: this.map,
      title: 'Number -12',
      content: {
        igniteZoneRampName: 'Cedar Rapids',
        emptyActualCount: 163,
        loadedActualCount: 743,
        loadedprojectedCount: 154,
        emptyProjectedCount: 336
      },
      icon: this.mIcon,
      label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
        text: '+120'}
    },
    {
      position: new google.maps.LatLng(32.609565, -96.626339),
      map: this.map,
      title: 'Number -12',
      content: {
        igniteZoneRampName: 'Cedar Rapids',
        emptyActualCount: 163,
        loadedActualCount: 743,
        loadedprojectedCount: 154,
        emptyProjectedCount: 336
      },
      icon: this.mIcon2,
      label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
        text: '+120'}
    },
    {
      position: new google.maps.LatLng(45.773487, -108.293819),
      map: this.map,
      title: 'Number -12',
      content: {
        igniteZoneRampName: 'Cedar Rapids',
        emptyActualCount: 163,
        loadedActualCount: 743,
        loadedprojectedCount: 154,
        emptyProjectedCount: 336
      },
      icon: this.mIcon2,
      label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
        text: '+120'}
    }
  ];


  constructor(private injector: Injector,
              private resolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private zone: NgZone,
              private rampInfoService: RampInfoService) {
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

  onMarkerClick(marker, e): void {
    this.rampInfoService.shareData(marker.content);
    if (this.compRef) {
      this.compRef.destroy();
    }
    const compFactory = this.resolver.resolveComponentFactory(RampInfoComponent);
    this.compRef = compFactory.create(this.injector);
    this.appRef.attachView(this.compRef.hostView);
    const div = document.createElement('div');
    div.appendChild(this.compRef.location.nativeElement);
    this.infoWindow.setContent(div);
    this.infoWindow.open(this.map, marker);
  }

  ngOnDestroy(): void {
    if (this.compRef) {
      this.compRef.destroy();
    }
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
      const marker = new google.maps.Marker({
        ...markerInfo
      });
      marker.addListener('click', (e) => {
       this.zone.run(() => this.onMarkerClick(marker, e));
     });
      marker.setMap(this.map);
   });
   this.infoWindow = new google.maps.InfoWindow();
   this.infoWindow.addListener('closeclick', _ => {
     this.compRef.destroy();
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
    this.infoWindow.close();
    this.detailView = !this.detailView;
    setTimeout(() => {
      const scrollingElement = (document.scrollingElement || document.body);
      scrollingElement.scrollTop = scrollingElement.scrollHeight;
    }, 100);

  }
  onShowPositionRequest(event): void {
    this.displayReposition = true;
  }

}
