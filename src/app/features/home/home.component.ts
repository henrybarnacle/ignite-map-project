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
  curvature = 0.3;
  curveMarkers;
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
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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
      id : 7,
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
    const mapProperties: any = {
      center: new google.maps.LatLng(39.468739, -98.950631),
      zoom: 4.5,
      disableDefaultUI: true,
      gestureHandling: 'cooperative',
      zoomControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: this.mapStyles.style
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    // subscribe to http call to get ramps, save ramps in model
    //  this.rampInfoService.loadRamps();
    // this.dataModel.ramps
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

    this.updateCurveMarker(marker, [this.markers[1], this.markers[2], this.markers[3]]);
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

  closeDetailView(): void {
    this.detailView = false;
    this.mapView = true;
    this.displayReposition = false;
  }

  updateCurveMarker(markerP1: any, connections: any[]): void {
    if (this.curveMarkers) {
      for (const marker of this.curveMarkers) {
        marker.setMap(null);
      }
    }
    this.curveMarkers = [];
    for (const connection of connections) {
      const Marker = google.maps.Marker;
      const Point = google.maps.Point;
      const pos1 = markerP1.position;
      const pos2 = connection.position;
      const projection = this.map.getProjection();
      const p1 = projection.fromLatLngToPoint(pos1);
      const p2 = projection.fromLatLngToPoint(pos2);

      // Calculate the arc.
      // To simplify the math, these points
      // are all relative to p1:
      const e = new Point(p2.x - p1.x, p2.y - p1.y); // endpoint (p2 relative to p1)
      const m = new Point(e.x / 2, e.y / 2); // midpoint
      const o = new Point(e.y, -e.x); // orthogonal
      const c = new Point( // curve control point
        m.x + this.curvature * o.x,
        m.y + this.curvature * o.y);

      const pathDef = 'M 0,0 ' +
        'q ' + c.x + ',' + c.y + ' ' + e.x + ',' + e.y;

      const zoom = this.map.getZoom();
      const scale1 = 1 / (Math.pow(2, -zoom));

      const symbol = {
        path: pathDef,
        scale: scale1,
        strokeWeight: 2,
        fillColor: 'none',
        strokeColor: 'black'
      };
      const curveMarker = new Marker({
        position: pos1,
        clickable: false,
        icon: symbol,
        zIndex: 0,
        map: this.map
      });
      this.curveMarkers.push(curveMarker);
      this.init(markerP1, connection);
    }
  }
    init(markerP1, markerP2 ): void {
      google.maps.event.addListener(this.map, 'projection_changed', this.updateCurveMarker);
      google.maps.event.addListener(this.map, 'zoom_changed', this.updateCurveMarker);

      google.maps.event.addListener(markerP1, 'position_changed', this.updateCurveMarker);
      google.maps.event.addListener(markerP2, 'position_changed', this.updateCurveMarker);
    }
  }


// } else {
//   this.curveMarker.setOptions({
//     position: pos1,
//     icon: symbol,
//   });
// }
