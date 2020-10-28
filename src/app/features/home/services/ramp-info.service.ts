import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RampInfoService {
  markerContent: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.markerContent = new BehaviorSubject<any>({});
  }

  shareData(markerContentData: any): void {
    this.markerContent.next(markerContentData);
  }
  loadRamps(): Observable<any> {
    const url = 'abc';
    return this.http.get(url);
  }
}
