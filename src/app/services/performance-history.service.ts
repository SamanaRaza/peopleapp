import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class PerformanceHistoryService {

  constructor(private http: HttpClient) {

  }

  public getBubble(): Observable<any> {
    return this.http.get('../../assets/PerformanceHistoryGraph.json');
  }
}
