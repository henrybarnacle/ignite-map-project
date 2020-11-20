import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { RampInfoService } from '../services/ramp-info.service';

@Component({
  selector: 'app-ramp-info',
  templateUrl: './ramp-info.component.html',
  styleUrls: ['./ramp-info.component.scss']
})
export class RampInfoComponent implements OnInit {
  data: any;
  buttonToggle: boolean;
  @Input() detailsView: boolean;
  @Output() showPositionRequest: EventEmitter<any> = new EventEmitter();


  constructor(private rampInfoService: RampInfoService) { }

  ngOnInit(): void {
    this.rampInfoService.markerContent.subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }

  showReposition(event): void {
    this.showPositionRequest.emit(event);
  }
}
