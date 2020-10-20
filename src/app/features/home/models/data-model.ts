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
}
