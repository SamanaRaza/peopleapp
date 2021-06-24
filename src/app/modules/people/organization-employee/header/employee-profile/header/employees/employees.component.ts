import { CommonModule } from '@angular/common';
import { Component, OnInit, NgModule, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferStoryService } from '../../../../../../../services/transfer-story.service';
@Component({
  selector: 'anms-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default

})
export class EmployeesComponent implements OnInit {
  timelines: any = [];
  constructor(private httpClient: HttpClient, private transferStoryService: TransferStoryService) { }
  ngOnInit() {
    this.transferStoryService.getTransferStory().subscribe(data => {
      console.log(data);
      this.timelines = data;
    })
  }
}


