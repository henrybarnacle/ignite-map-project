import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-capaciy-table',
  templateUrl: './capaciy-table.component.html',
  styleUrls: ['./capaciy-table.component.scss']
})
export class CapaciyTableComponent implements OnInit {

  capacityData;
  newRows;
  newColumns;

  constructor() { }

  ngOnInit(): void {
    // this.capacityData = [{emptyProjected: '123', emptyActual: '675', loadedActual: '998', loadedProjected: '221'},
    //   {emptyProjected: '123', emptyActual: '675', loadedActual: '998', loadedProjected: '221'},
    //   {emptyProjected: '223', emptyActual: '175', loadedActual: '333', loadedProjected: '81'},
    //   {emptyProjected: '562', emptyActual: '543', loadedActual: '110', loadedProjected: '009'},
    //   {emptyProjected: '987', emptyActual: '65', loadedActual: '911', loadedProjected: '990'},
    //   {emptyProjected: '652', emptyActual: '671', loadedActual: '298', loadedProjected: '335'}];

    this.newRows = [
      { ruleName: 'Initial Ingate',
        ruleDescription: 'desctiption abc',
        taskCategory: 'Appointment',
        serviceOffering: 'JBI- Intermodal',
        receiverCode: '4343r',
        shipperCode: '2f2ff',
        billTo: 'scneab',
        createdBy: 'peter paul',
        lastUpdatedBy: '12/12/2202',
        status: 'Active'
      },
      { ruleName: 'Valid Pickup',
        ruleDescription: 'desctiption e3f',
        taskCategory: 'Appointment',
        serviceOffering: 'JBI- Intermodal',
        receiverCode: '5553r',
        shipperCode: '111f2ff',
        billTo: 'tuson',
        createdBy: 'peter paul',
        lastUpdatedBy: '03/03/2200',
        status: 'Active'
      },
      { ruleName: 'After Pickup',
        ruleDescription: 'desctiption xyz',
        taskCategory: 'Service',
        serviceOffering: 'JBI- Intermodal',
        receiverCode: '4553r',
        shipperCode: '999f2ff',
        billTo: 'walmart',
        createdBy: 'peter paul',
        lastUpdatedBy: '12/02/2201',
        status: 'Active'
      },
    ];
    this.newColumns = [
      { field: 'ruleName', header: 'Rule Name' },
      { field: 'ruleDescription', header: 'Rule Description' },
      { field: 'taskCategory', header: 'Task Category' },
      { field: 'serviceOffering', header: 'Service Offering' },
      { field: 'receiverCode', header: 'Receiver Code' },
      { field: 'shipperCode', header: 'Shipper Code' },
      { field: 'billTo', header: 'Bill to' },
      { field: 'createdBy', header: 'Created By' },
      { field: 'lastUpdatedBy', header: 'Last Updated By' },
      { field: 'status', header: 'Status' }
    ];
  }

}
