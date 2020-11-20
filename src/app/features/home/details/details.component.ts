import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  data: any;
  options: any;
  @Output() showPositionRequest: EventEmitter<any> = new EventEmitter();
  constructor() {
    // mock data
    this.data = {
      labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],


      datasets: [
        {
          label: 'Outbound',
          lineTension: 0,
          borderColor: 'red',
          pointRadius: 0,
          fill: false,
          data: [836, 813, 867, 873, 836, 826, 843]
        },
        {
          label: 'Inbound',
          lineTension: 0,
          borderColor: '#3CB371',
          pointRadius: 0,
          fill: false,
          data: [498, 426, 548, 298, 229, 405, 308]
        }
      ]
    };
    this.options = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          gridLines: {
            display: false
          }
        }],
      }
    };
  }

  ngOnInit(): void {
  }

  onShowPositionRequest(event: any): void {
    this.showPositionRequest.emit(event);
  }

}
