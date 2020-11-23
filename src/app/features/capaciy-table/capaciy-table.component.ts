import { Component, OnInit } from '@angular/core';
import { RampInfoService } from '../home/services/ramp-info.service';

@Component({
  selector: 'app-capaciy-table',
  templateUrl: './capaciy-table.component.html',
  styleUrls: ['./capaciy-table.component.scss']
})
export class CapaciyTableComponent implements OnInit {

  capacityData;
  newRows;
  newColumns;

  constructor(private readonly rampInfoService: RampInfoService) { }

  ngOnInit(): void {
    this.rampInfoService.tableContent.subscribe(data => {
      this.capacityData = data;
      console.log(this.capacityData);
    });


  }

}
