import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RampInfoService {
  markerContent: BehaviorSubject<any>;

  constructor() {
    this.markerContent = new BehaviorSubject<any>({});
  }

  shareData(markerContentData: any): void {
    this.markerContent.next(markerContentData);
  }
}
