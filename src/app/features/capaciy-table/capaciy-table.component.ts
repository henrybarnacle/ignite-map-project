import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-capaciy-table',
  templateUrl: './capaciy-table.component.html',
  styleUrls: ['./capaciy-table.component.scss']
})
export class CapaciyTableComponent implements OnInit {

  capacityData;

  constructor() { }

  ngOnInit(): void {
    this.capacityData = [{emptyProjected: '123', emptyActual: '675', loadedActual: '998', loadedProjected: '221'},
      {emptyProjected: '123', emptyActual: '675', loadedActual: '998', loadedProjected: '221'},
      {emptyProjected: '223', emptyActual: '175', loadedActual: '333', loadedProjected: '81'},
      {emptyProjected: '562', emptyActual: '543', loadedActual: '110', loadedProjected: '009'},
      {emptyProjected: '987', emptyActual: '65', loadedActual: '911', loadedProjected: '990'},
      {emptyProjected: '652', emptyActual: '671', loadedActual: '298', loadedProjected: '335'}];
  }

}
