import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmploymentStoryService {

  constructor(private http: HttpClient) { }
  public getEmploymentStory(): Observable<any> {
    return this.http.get('../../assets/EmploymentStory.json');
  }
}
