import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { EmploymentStoryService } from '../../../../../../../../services/employment-story.service';
import { Breadcrumb } from 'src/app/shared/breadcrumb/breadcrumb.model';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';

@Component({
  selector: 'anms-employment-story',
  templateUrl: './employment-story.component.html',
  styleUrls: ['./employment-story.component.scss'],
})
export class EmploymentStoryComponent implements OnInit {

  employeeTimeline: any = []
  queryParams: any = {};
  isLoading = true;

  constructor(private httpClient: HttpClient, private readonly breadcrumbService: BreadcrumbService, private route: ActivatedRoute,
    private employmentStoryService: EmploymentStoryService, private cdf: ChangeDetectorRef) { }

  ngOnInit() {
    let that = this;
    this.queryParams = this.route.snapshot.queryParams;
    this.employmentStoryService.getEmploymentStory().subscribe((result: any) => {
      this.employeeTimeline = result.filter((x: any) => x.employeeId == this.queryParams.employeeId);
      console.log(this.employeeTimeline)

    })
  }

  ngAfterViewInit() {
    let that = this;
    that.setBreadcrumbs();
    this.cdf.detectChanges();
  }

  setBreadcrumbs() {
    let that = this;
    let breadcrumbs: Breadcrumb[] = [];
    breadcrumbs.push({
      label: 'Org & Employee Profile',
      url: '/people/organization-employee/hr-services',
      params: {}
    });
    breadcrumbs.push({
      label: 'Employee Profile',
      url: '/people/organization-employee/hr-services/emp-profile/employees',
      params: {
      }
    });
    breadcrumbs.push({
      label: 'Employees',
      url: '',
      params: {}
    });
    that.breadcrumbService.set(breadcrumbs);
  }
}
