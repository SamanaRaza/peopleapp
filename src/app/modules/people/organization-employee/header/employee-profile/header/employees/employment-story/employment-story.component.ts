import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { EmploymentStoryService } from '../../../../../../../../services/employment-story.service';

@Component({
  selector: 'anms-employment-story',
  templateUrl: './employment-story.component.html',
  styleUrls: ['./employment-story.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EmploymentStoryComponent implements OnInit {
  employeeTimeline: any = []
  queryParams: any = {};
  isLoading = true;
  show: boolean;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute,
    private employmentStoryService: EmploymentStoryService) { }

  ngOnInit() {
    let that = this;
    this.queryParams = this.route.snapshot.queryParams;
    this.employmentStoryService.getEmploymentStory().subscribe((result: any) => {
      this.employeeTimeline = result.filter((x: any) => x.employeeId == this.queryParams.employeeId);
      // data is ready show view.
      this.show = true;

    })
  }


}
