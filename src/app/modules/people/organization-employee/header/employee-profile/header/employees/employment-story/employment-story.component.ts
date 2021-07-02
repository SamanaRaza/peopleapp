import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from 'src/app/shared/breadcrumb/breadcrumb.model';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';
import { AllServicesService } from 'src/app/services/all-services.service';
import { ComParentChildService } from 'src/app/services/com-parent-child.service';
import { Subscription } from 'rxjs';
import cssVars from 'css-vars-ponyfill';

@Component({
  selector: 'anms-employment-story',
  templateUrl: './employment-story.component.html',
  styleUrls: ['./employment-story.component.scss'],
})
export class EmploymentStoryComponent implements OnInit {
  employeeTimeline: any = [];
  queryParams: any = {};
  isLoading = true;
  color: any = [];
  private subscription: Subscription;
  constructor(
    private httpClient: HttpClient,
    private readonly breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private comParentChildService: ComParentChildService,
    private allServicesService: AllServicesService,
    private cdf: ChangeDetectorRef
  ) {
    this.subscription = this.comParentChildService
      .on('colors')
      .subscribe((data) => {
        this.color = data;
        console.log('Color2', this.color);
        cssVars({
          variables: {
            '--designation': this.color.designation,
            '--band': this.color.band,
            '--department': this.color.department,
            '--name': this.color.name,
            '--duration_date': this.color.duration_date,
            '--location': this.color.location,
            '--office_name': this.color.office_name,
            '--foreground': this.color.foreground,
            '--background': this.color.background,
            '--graph_foreground': this.color.graph_foreground,
            '--graph_background': this.color.graph_background,
            '--appriasal_name': this.color.appriasal_name,
            '--appriasal_rating': this.color.appriasal_rating,
            '--salary_change': this.color.salary_change,
            '--rewards': this.color.rewards,
            '--appericiation': this.color.appericiation,
            '--warning': this.color.warning,
            '--perfomance_department': this.color.perfomance_department,
            '--appriasal_name_year': this.color.appriasal_name_year,
            '--arrow_designation': this.color.arrow_designation,
            '--arrow_name': this.color.arrow_name,
            '--arrow_department': this.color.arrow_department,
            '--font_color': this.color.font_color,
            '--title_background_color': this.color.title_background_color,
            '--title_font_color': this.color.title_font_color,
            '--background_color': this.color.background_color,
          },
        });
      });
  }

  ngOnInit() {
    let that = this;
    this.queryParams = this.route.snapshot.queryParams;
    this.allServicesService.getEmploymentStory().subscribe((result: any) => {
      this.employeeTimeline = result.filter(
        (x: any) => x.employeeId == this.queryParams.employeeId
      );
    });
  }

  ngAfterViewInit() {
    let that = this;
    that.setBreadcrumbs();
    this.cdf.detectChanges();
  }

  currentYear(event: any) {
    console.log('year', event.target.innerHTML);
  }
  BandClick(event: any) {
    console.log('Band', event.target.innerHTML);
  }
  AppriasalName(event: any) {
    console.log('AppriasalName', event.target.innerHTML);
  }
  assesment(event: any) {
    console.log('assesment', event.target.innerHTML);
  }
  salary(event: any) {
    console.log('Old Salary & New Salary', event.target.innerHTML);
  }
  currentDesignation(event: any) {
    console.log('currentDesignation', event.target.innerHTML);
  }
  currentDepartment(event: any) {
    console.log('currentDepartment', event.target.innerHTML);
  }
  currentBranch(event: any) {
    console.log('currentBranch', event.target.innerHTML);
  }
  startingDate(event: any) {
    console.log('startingDate', event.target.innerHTML);
  }
  duration(event: any) {
    console.log('duration', event.target.innerHTML);
  }
  LMDuration(event: any) {
    console.log('LM Duration', event.target.innerHTML);
  }
  LMName(event: any) {
    console.log('LM Name', event.target.innerHTML);
  }
  LMInfo(event: any) {
    console.log('LM Info', event.name + '' + event.duration);
  }
  setBreadcrumbs() {
    let that = this;
    let breadcrumbs: Breadcrumb[] = [];
    breadcrumbs.push({
      label: 'Org & Emp',
      url: '/people/organization-employee/hr-services',
      params: {},
    });
    breadcrumbs.push({
      label: 'Employee Profile',
      url: '/people/organization-employee/hr-services/emp-profile/employees',
      params: {},
    });
    breadcrumbs.push({
      label: 'Employees',
      url: '',
      params: {},
    });
    that.breadcrumbService.set(breadcrumbs);
  }
}
