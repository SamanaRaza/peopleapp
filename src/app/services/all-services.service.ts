import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AllServicesService {

  constructor(private http: HttpClient) {
  }

  public getEmployeeSalaryHistroy(): Observable<any> {
    return this.http.get('assets/EmployeeSalaryHistory.json');
  }
  public getEmployeeChangeHistroy(): Observable<any> {
    return this.http.get('assets/EmploymentChangeHistory.json');
  }
  public getEmployees(): Observable<any> {
    return this.http.get('assets/EmployeesData.json');
  }
  public getBandGraph(): Observable<any> {
    return this.http.get('assets/band_designation.json');
  }
  public getEmploymentStory(): Observable<any> {
    return this.http.get('assets/employment_story.json');
  }
  getTransferStory(): Observable<any> {
    return this.http.get('assets/transfer_story.json');
  }
  public getSalaryGraph(): Observable<any> {
    return this.http.get('assets/salary_change_history.json');
  }
  public getPerformance(): Observable<any> {
    return this.http.get('assets/perfomance_history.json');
  }
  public getEmpDetails(): Observable<any> {
    return this.http.get("assets/EmployeesData.json");
  }
  public getColors(): Observable<any> {
    return this.http.get("assets/employee_his_colors.json");
  }
}
