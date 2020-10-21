import { Component, OnInit } from '@angular/core';
import { RampInfoService } from '../services/ramp-info.service';

@Component({
  selector: 'app-ramp-info',
  templateUrl: './ramp-info.component.html',
  styleUrls: ['./ramp-info.component.scss']
})
export class RampInfoComponent implements OnInit {
  data: any;

  constructor(private rampInfoService: RampInfoService) { }

  ngOnInit(): void {
    this.rampInfoService.markerContent.subscribe(data => {
      this.data = data;
    });
  }

}
