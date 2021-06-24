import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) {

  }

  public getEmployees(): Observable<any> {
    return this.http.get('../../assets/EmployeesData.json');
  }
}
