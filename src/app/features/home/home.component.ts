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
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  providers: [MessageService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild('map') mapElement: ElementRef;

  map: google.maps.Map;
  infoWindow: any;
  compRef: ComponentRef<RampInfoComponent>;
  mapStyles;
  curvature = 0.2;
  curveMarkers;
  coordsModel;
  dataModel;
  data: any;
  displayFilters: boolean;
  displayReposition: boolean;
  displayExecute: boolean;
  detailView: boolean;
  mapView: boolean;
  tableView: boolean;
  showSubmitButton: boolean;
  newEnd: any;
  laneBalances: any[] = [];
  repositionTotal = 0;
  laneInfowindows: any[];
  selected: any;
  selectedBalance: number;
  timeDate: Date;
  moves = [];

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
      position: new google.maps.LatLng(34.217032, -117.986211),
      map: this.map,
      id: 1,
      data: {id: '', data: []},
      reposition: '',
      balance: 0,
      title: 'Los Angeles',
      content: {
        igniteZoneRampName: 'Los Angeles',
        inbound: {empty: 0, loadedActual: 0, loadedProjected: 0},
        outbound: {empty: 0, loadedActual: 0, loadedProjected: 0}
      },
      icon: this.mIcon,
      label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
        text: '-54'}
    },
    {
      position: new google.maps.LatLng(35.116508, -90.275706),
      map: this.map,
      title: 'Memphis',
      id: 2,
      balance: 0,
      data: {id: '', data: []},
      reposition: '',
      content: {
        igniteZoneRampName: 'Memphis',
        inbound: {empty: 0, loadedActual: 0, loadedProjected: 0},
        outbound: {empty: 0, loadedActual: 0, loadedProjected: 0}
      },
      icon: this.mIcon,
      label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
        text: '+120'}
    },
    {
      position: new google.maps.LatLng(30.457216, -81.938591),
      map: this.map,
      title: 'Jacksonville',
      id: 3,
      balance: 0,
      data: {id: '', data: []},
      reposition: '',
      content: {
        igniteZoneRampName: 'Jacksonville',
        inbound: {empty: 0, loadedActual: 0, loadedProjected: 0},
        outbound: {empty: 0, loadedActual: 0, loadedProjected: 0}
      },
      icon: this.mIcon,
      label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
        text: '+120'}
    },
    {
      position: new google.maps.LatLng(29.960949, -95.629310),
      map: this.map,
      title: 'Houston',
      id: 4,
      balance: 0,
      data: {id: '', data: []},
      reposition: '',
      content: {
        igniteZoneRampName: 'Houston',
        inbound: {empty: 0, loadedActual: 0, loadedProjected: 0},
        outbound: {empty: 0, loadedActual: 0, loadedProjected: 0}
      },
      icon: this.mIcon2,
      label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
        text: '+120'}
    },
    {
      position: new google.maps.LatLng(42.660742, -73.837463),
      map: this.map,
      title: 'Albany',
      id: 5,
      balance: 0,
      data: {id: '', data: []},
      reposition: '',
      content: {
        igniteZoneRampName: 'Albany',
        inbound: {empty: 0, loadedActual: 0, loadedProjected: 0},
        outbound: {empty: 0, loadedActual: 0, loadedProjected: 0}
      },
      icon: this.mIcon,
      label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
        text: '+120'}
    },
    {
      position: new google.maps.LatLng(42.168155, -83.334735),
      map: this.map,
      title: 'Detroit',
      id: 6,
      balance: 0,
      data: {id: '', data: []},
      reposition: '',
      content: {
        igniteZoneRampName: 'Detroit',
        inbound: {empty: 0, loadedActual: 0, loadedProjected: 0},
        outbound: {empty: 0, loadedActual: 0, loadedProjected: 0}
      },
      icon: this.mIcon2,
      label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
        text: '+120'}
    },
    {
      position: new google.maps.LatLng(47.543927, -122.282336),
      map: this.map,
      title: 'Seattle',
      id : 7,
      balance: 0,
      data: {id: '', data: []},
      reposition: '',
      content: {
        igniteZoneRampName: 'Seattle',
        inbound: {empty: 0, loadedActual: 0, loadedProjected: 0},
        outbound: {empty: 0, loadedActual: 0, loadedProjected: 0}
      },
      icon: this.mIcon2,
      label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
        text: '+120'}
    },
    {
      position: new google.maps.LatLng(38.775324, -94.578076),
      map: this.map,
      title: 'Kansas City',
      id : 8,
      balance: 0,
      data: {id: '', data: []},
      reposition: '',
      content: {
        igniteZoneRampName: 'Kansas City',
        inbound: {empty: 0, loadedActual: 112, loadedProjected: 0},
        outbound: {empty: 0, loadedActual: 224, loadedProjected: 0}
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
              private rampInfoService: RampInfoService,
              private readonly messageService: MessageService) {
    this.mapStyles = new MapStylesModel();
    this.coordsModel = new CoordsModel();
    this.dataModel = new DataModel();
    Window['homeComponent'] = this;
  }

  ngOnInit(): void {
    this.timeDate = new Date();
    this.mapView = true;
  }

  ngAfterViewInit(): void {
    this.loadMap(true);
  }

  loadMap(getData: boolean): void {
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
    this.getRampData(getData);
    this.setRegions();
  }

  getRampData(getData: boolean): void {
    if (getData) {
      for (const marker of this.markers) {
        marker.data = this.dataModel.dataDTO.find(node => node.id === marker.id);
      }
    }
    this.calculateRampBalances();
  }

  calculateRampBalances(): void {
    for (const marker of this.markers) {
     // marker.data = this.dataModel.dataDTO.find( node => node.id === marker.id);
      marker.content.inbound = {empty: 0, loadedActual: 0, loadedProjected: 0};
      marker.content.outbound = {empty: 0, loadedActual: 0, loadedProjected: 0};
      let outbound = 0;
      let inbound = 0;
      for (const connection of marker.data.data) {
        inbound += connection.inbound.loadedActual;
        inbound += connection.inbound.loadedProjected;
        inbound += connection.inbound.empty;
        marker.content.inbound.loadedActual += connection.inbound.loadedActual;
        marker.content.inbound.loadedProjected += connection.inbound.loadedProjected;
        outbound += connection.outbound.loadedActual;
        outbound += connection.outbound.loadedProjected;
        marker.content.outbound.loadedActual += connection.outbound.loadedActual;
        marker.content.outbound.loadedProjected += connection.outbound.loadedProjected;
      }
      marker.balance = inbound - outbound;
      marker.label.text = (marker.balance > 0) ? `+${marker.balance.toString()}` : marker.balance.toString();
      marker.icon = (marker.balance < 0) ? this.mIcon : this.mIcon2;
    }
    this.rampInfoService.setTableData(this.markers);
    this.loadAllMarkers();
  }
  onMarkerClick(marker, e): void {
    this.selected = marker;
    this.selectedBalance = (this.selected.content.inbound.loadedActual + this.selected.content.inbound.loadedProjected) -
      (this.selected.content.outbound.loadedActual + this.selected.content.outbound.loadedProjected);
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
    setTimeout(() => {
      this.updateCurveMarker(marker, [this.markers[1], this.markers[2], this.markers[3], this.markers[4]]);
    }, 500);
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
      this.loadMap(false);
    }, 1000);
  }

  showTable(): void {
    this.mapView = false;
    this.tableView = true;
  }

  showFilters(): void {

  }
  showExecute(): void {
    this.displayExecute = true;
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
    const pt = new google.maps.LatLng(40.468739, -98.950631);
    this.map.setCenter(pt);
    this.detailView = !this.detailView;
    setTimeout(() => {
      const scrollingElement = (document.scrollingElement || document.body);
      scrollingElement.scrollTop = scrollingElement.scrollHeight;
    }, 100);
    setTimeout(() => {
    for (const infowindow of this.laneInfowindows) {
      infowindow.open(this.map);
    }
    }, 500);
  }

  onShowPositionRequest(event): void {
    const top = this.laneBalances.splice(2, 1);
    this.laneBalances.unshift(top[0]);
    for (const lane of this.laneBalances) {
      lane.recommend = 0;
    }
    this.laneBalances[0].recommend = Math.abs(this.selected.balance);
    this.displayReposition = true;
  }

  onShowExecuteRequest(event): void {
    this.displayExecute = true;
  }

  closeDetailView(): void {
    this.detailView = false;
    this.mapView = true;
    this.displayReposition = false;
  }

  giveTotal(): void {
    this.repositionTotal = 0;
    for (const lane of this.laneBalances) {
      if (lane.reposition !== '') {
        this.repositionTotal += parseInt(lane.reposition, 10);
      }
    }
  }
  saveReposition(): void {
    for (const lane of this.laneBalances) {
      if (lane.reposition !== '') {
        for (const marker of this.markers) {
          if (marker.id === lane.id) {
            marker.reposition = lane.reposition;
            const index = marker.data.data.findIndex(dataPoint => dataPoint.id === this.selected.id);
            marker.data.data[index].outbound.loadedProjected  += parseInt(lane.reposition, 10);
            const selectedIndex = this.selected.data.data.findIndex(dataPoint => dataPoint.id === lane.id);
            this.selected.data.data[selectedIndex].inbound.empty += parseInt(lane.reposition, 10);
            const move = {outbound: lane.name, inbound: this.selected.content.igniteZoneRampName, amount: lane.reposition};
            this.moves.push(move);
          }
        }
      }
    }
    this.repositionTotal = 0;
    this.closeDetailView();
    this.messageService.add({severity: 'info', summary: 'info', detail: 'Reposition saved', closable: false});
    setTimeout(() => {
      this.loadMap(false);
      this.showSubmitButton = true;
    }, 3500);
  }

  submitExecution(): void {
    this.displayExecute = false;
    this.showSubmitButton = false;
    this.messageService.add({severity: 'success', summary: 'Success!', detail: 'Reposition Submitted', closable: false});
  }

  updateCurveMarker(markerP1: any, connections: any[]): void {
    this.laneBalances = [];
    if (this.curveMarkers) {
      for (const marker of this.curveMarkers) {
        marker.setMap(null);
      }
    }
    this.curveMarkers = [];
    if (this.laneInfowindows) {
      for (const infowindow of this.laneInfowindows) {
        infowindow.close();
      }
      this.laneInfowindows = [];
    } else {
      this.laneInfowindows = [];
    }
    for (const connection of connections) {
      const Marker = google.maps.Marker;
      const Point = google.maps.Point;
      const clickPoint = markerP1.position;
      const pos2 = connection.position;
      const projection = this.map.getProjection();
      const p1 = projection.fromLatLngToPoint(clickPoint);
      const p2 = projection.fromLatLngToPoint(pos2);

      // calculate offset
      const offsetX = (Math.abs(p1.x - p2.x) < 3) ? 0.6 : 1.3;
      const offsetY = (Math.abs(p1.y - p2.y) < 3) ? 0.6 : 1.3;
      // const offsetX = 0;
      // const offsetY = 0;
      const p2End = {x: 0, y: 0};
      p2.x = ( p2.x < p1.x) ? p2.x + offsetX : p2.x - offsetX;
      p2End.x = ( p2.x < p1.x) ? p2.x - (offsetX / 2) : p2.x + (offsetX / 2);
      p2.y = ( p2.y < p1.y) ? p2.y + offsetY : p2.y - offsetY;
      p2End.y = ( p2.y < p1.y) ? p2.y - (offsetY / 2) : p2.y + (offsetY / 2);
      const outBoundPosition = new Point(p2End.x, p2End.y);

      const clickX = (p1.x < p2.x) ? p1.x + (offsetX / 2) : p1.x - (offsetX / 2);
      const clickY = (p1.y < p2.y) ? p1.y + (offsetY / 2) : p1.y - (offsetY / 2);
      const offsetClick = new Point(clickX, clickY);
      const newClickPoint = projection.fromPointToLatLng(offsetClick);


      const zoom = this.map.getZoom();
      const scale1 = 1 / (Math.pow(2, -zoom));
      const infowindow = new google.maps.InfoWindow({
        content: this.getLaneWindowInfo(markerP1, connection)});
      const symbol = {
        path: this.getPathDef(p1, p2, Point, this.curvature, infowindow, projection),
        scale: scale1,
        strokeWeight: 2.5,
        fillColor: 'none',
        strokeColor: 'dodgerblue'
      };
      const dotSymbol = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 3.5,
        strokeWeight: 4.5,
        fillColor: 'dodgerblue',
        strokeColor: 'dodgerblue'
      };
      const curveMarker = new Marker({
        position: newClickPoint,
        clickable: false,
        icon: symbol,
        zIndex: 0,
        map: this.map
      });

      const curveMarkerInbound = new Marker({
        position: newClickPoint,
        clickable: false,
        icon: dotSymbol,
        zIndex: 0,
        map: this.map
      });

      this.curveMarkers.push(curveMarker);
      this.curveMarkers.push(curveMarkerInbound);

      const outBoundPoint = projection.fromPointToLatLng(outBoundPosition);
      const curveMarkerOutbound = new Marker({
        position: outBoundPoint,
        clickable: false,
        icon: dotSymbol,
        zIndex: 0,
        map: this.map
      });
      this.curveMarkers.push(curveMarkerOutbound);

      // add infowindows for lanes
      const e = new Point(outBoundPosition.x - offsetClick.x, outBoundPosition.y - offsetClick.y); // endpoint (p2 relative to p1)
      const m = new Point(e.x / 2, e.y / 2); // midpoint
      const o = new Point(e.y, -e.x); // orthogonal
      const c = new Point( // curve control point
        m.x + this.curvature * o.x,
        m.y + this.curvature * o.y);
      const c2 = new Point(
        c.x + offsetClick.x - this.curvature * o.x * 0.5,
        c.y + offsetClick.y - this.curvature * o.y * 0.5
      );
      infowindow.setPosition(projection.fromPointToLatLng(c2));
      this.laneInfowindows.push(infowindow);
      this.init(markerP1, connection);
    }
  }
  init(markerP1, markerP2 ): void {
    google.maps.event.addListener(this.map, 'projection_changed', this.updateCurveMarker);
    google.maps.event.addListener(this.map, 'zoom_changed', this.updateCurveMarker);
    google.maps.event.addListener(markerP1, 'position_changed', this.updateCurveMarker);
    google.maps.event.addListener(markerP2, 'position_changed', this.updateCurveMarker);
  }
  getLaneWindowInfo(markerP1: any, connection: any): string {
    const data = markerP1.data.data.find(dataPoint => dataPoint.id === connection.id);
    const totalInbound = data.inbound.loadedActual + data.inbound.loadedProjected;
    const totalOutound = data.outbound.loadedActual + data.outbound.loadedProjected;
    const laneBalance = {
      id: connection.id,
      name: connection.content.igniteZoneRampName,
      inbound: totalInbound,
      outbound: totalOutound,
      reposition: ''};
    this.laneBalances.push(laneBalance);
    return `Inbound ${totalInbound}, Outbound ${totalOutound}`;
  }

  getPathDef(p1: any, p2: any, Point: any, curve, infowindow: any, projection: any): string {
    const e = new Point(p2.x - p1.x, p2.y - p1.y); // endpoint (p2 relative to p1)
    const m = new Point(e.x / 2, e.y / 2); // midpoint
    const o = new Point(e.y, -e.x); // orthogonal
    const c = new Point( // curve control point
      m.x + curve * o.x,
      m.y + curve * o.y);
    return 'M 0,0 ' +
      'q ' + c.x + ',' + c.y + ' ' + e.x + ',' + e.y;
  }
}
