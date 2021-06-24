import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeSalaryHistoryService {

  constructor(private http: HttpClient) {
  }

  public getEmployeeSalaryHistroy(): Observable<any> {
    return this.http.get('../../assets/EmployeeSalaryHistory.json');
  }
}
