import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SalaryChangeHistoryGraphService {

  constructor(private http: HttpClient) {

  }

  public getGraph(): Observable<any> {
    return this.http.get('../../assets/SalaryChangeHistoryGraph.json');
  }
}
