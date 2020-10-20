import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  data: any;
  options: any;
  constructor() {
    // mock data
    this.data = {
      labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],

      datasets: [
        {
          label: 'First Dataset',
          lineTension: 0,
          borderColor: 'red',
          pointRadius: 0,
          fill: false,
          data: [2000, 3000, 4000, 1000, 2000, 3000, 2000, 2000, 3000, 4000, 1000, 2000, 3000, 2000]
        },
        {
          label: 'Second Dataset',
          lineTension: 0,
          borderColor: '#3CB371',
          pointRadius: 0,
          fill: false,
          data: [1000, 2000, 1000, 3000, 4000, 2000, 1000, 1000, 2000, 1000, 3000, 4000, 2000, 1000]
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

}
