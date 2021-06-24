import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmploymentChangeHistoryService {

  constructor(private http: HttpClient) { }
  public getEmployeeChangeHistroy(): Observable<any> {
    return this.http.get('../../assets/EmploymentChangeHistory.json');
  }
}
