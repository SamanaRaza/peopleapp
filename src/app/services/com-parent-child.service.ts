import { Injectable } from '@angular/core';
import {
  Observable, Subject, Subscription
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComParentChildService {

  private subjects: Subject<any>[] = [];

  publish(eventName: any, res?: any) {
    // ensure a subject for the event name exists
    this.subjects[eventName] = this.subjects[eventName] || new Subject();

    // publish event
    this.subjects[eventName].next(res);
  }

  on(eventName: any): Observable<any> {
    // ensure a subject for the event name exists
    this.subjects[eventName] = this.subjects[eventName] || new Subject();

    // return observable
    return this.subjects[eventName].asObservable();
  }

}
