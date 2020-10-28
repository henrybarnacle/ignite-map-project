export class DataModel {
  dataDTO: any;

  constructor() {
    this.dataDTO = [
      {
        locationName: 'Kansas City',
        inbound: {
          emptyActual: 668,
          emptyProjected: 468,
          loadedActual: 200,
          loadedProjected: 200
        }
      },
      {
        outbound: {
          emptyActual: 668,
          emptyProjected: 468,
          loadedActual: 110,
          loadedProjected: 200
        }
      }
    ];
  }
  // mIcon = {
  //   path: google.maps.SymbolPath.CIRCLE,
  //   fillOpacity: 1,
  //   fillColor: '#E80000',
  //   strokeOpacity: 1,
  //   strokeWeight: 1,
  //   strokeColor: '#E80000',
  //   opacity: 0.6,
  //   scale: 18
  // };
  // mIcon2 = {
  //   path: google.maps.SymbolPath.CIRCLE,
  //   fillOpacity: 1,
  //   fillColor: '#3CB371',
  //   strokeOpacity: 1,
  //   strokeWeight: 1,
  //   strokeColor: '#3CB371',
  //   opacity: 0.6,
  //   scale: 18
  // };
  //
  // markers = [
  //   {
  //     position: new google.maps.LatLng(39.468739, -98.950631),
  //     map: '',
  //     id: 1,
  //     title: 'Number 123',
  //     content: {
  //       igniteZoneRampName: 'Kansas City',
  //       emptyActualCount: 123,
  //       loadedActualCount: 443,
  //       loadedprojectedCount: 222,
  //       emptyProjectedCount: 76
  //     },
  //     icon: this.mIcon,
  //     label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
  //       text: '-54'}
  //   },
  //   {
  //     position: new google.maps.LatLng(43.469739, -92.951631),
  //     map: this.map,
  //     title: 'Number -12',
  //     id: 2,
  //     content: {
  //       igniteZoneRampName: 'Cedar Rapids',
  //       emptyActualCount: 163,
  //       loadedActualCount: 743,
  //       loadedprojectedCount: 154,
  //       emptyProjectedCount: 336
  //     },
  //     icon: this.mIcon,
  //     label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
  //       text: '+120'}
  //   },
  //   {
  //     position: new google.maps.LatLng(47.626738, -121.982783),
  //     map: this.map,
  //     title: 'Number -12',
  //     id: 3,
  //     content: {
  //       igniteZoneRampName: 'Cedar Rapids',
  //       emptyActualCount: 163,
  //       loadedActualCount: 743,
  //       loadedprojectedCount: 154,
  //       emptyProjectedCount: 336
  //     },
  //     icon: this.mIcon,
  //     label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
  //       text: '+120'}
  //   },
  //   {
  //     position: new google.maps.LatLng(33.859271, -117.720087),
  //     map: this.map,
  //     title: 'Number -12',
  //     id: 4,
  //     content: {
  //       igniteZoneRampName: 'Cedar Rapids',
  //       emptyActualCount: 163,
  //       loadedActualCount: 743,
  //       loadedprojectedCount: 154,
  //       emptyProjectedCount: 336
  //     },
  //     icon: this.mIcon2,
  //     label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
  //       text: '+120'}
  //   },
  //   {
  //     position: new google.maps.LatLng(41.728512, -87.749386),
  //     map: this.map,
  //     title: 'Number -12',
  //     id: 5,
  //     content: {
  //       igniteZoneRampName: 'Cedar Rapids',
  //       emptyActualCount: 163,
  //       loadedActualCount: 743,
  //       loadedprojectedCount: 154,
  //       emptyProjectedCount: 336
  //     },
  //     icon: this.mIcon,
  //     label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
  //       text: '+120'}
  //   },
  //   {
  //     position: new google.maps.LatLng(32.609565, -96.626339),
  //     map: this.map,
  //     title: 'Number -12',
  //     id: 6,
  //     content: {
  //       igniteZoneRampName: 'Cedar Rapids',
  //       emptyActualCount: 163,
  //       loadedActualCount: 743,
  //       loadedprojectedCount: 154,
  //       emptyProjectedCount: 336
  //     },
  //     icon: this.mIcon2,
  //     label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
  //       text: '+120'}
  //   },
  //   {
  //     position: new google.maps.LatLng(45.773487, -108.293819),
  //     map: this.map,
  //     title: 'Number -12',
  //     id : 7,
  //     content: {
  //       igniteZoneRampName: 'Cedar Rapids',
  //       emptyActualCount: 163,
  //       loadedActualCount: 743,
  //       loadedprojectedCount: 154,
  //       emptyProjectedCount: 336
  //     },
  //     icon: this.mIcon2,
  //     label: {color: '#FFF', fontSize: '13px', fontWeight: '450', letterSpacing: '2px',
  //       text: '+120'}
  //   }
  // ];
}
