import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TransferStoryService {
  constructor(private http: HttpClient) { }
  getTransferStory(): Observable<any> {
    return this.http.get('../../assets/transfer_story.json');
  }

}
