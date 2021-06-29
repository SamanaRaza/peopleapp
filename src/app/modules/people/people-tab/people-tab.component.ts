import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Tab } from 'src/app/shared/tabs/tab';

@Component({
  selector: 'anms-people-tab',
  templateUrl: './people-tab.component.html',
  styleUrls: ['./people-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PeopleTabComponent implements OnInit {

  constructor() { }
  mainTab: Tab[] = [
    new Tab(1, "Home", ['/', 'people', 'home']),
    new Tab(2, "Org & Emp", ['/', 'people', 'organization-employee', 'hr-services']),
  ];
  ngOnInit(): void {
  }

}
