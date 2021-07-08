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
import { ValueTransformer } from '@angular/compiler/src/util';

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
  years : any = [];
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
            '--foreground': this.color.year.foreground,
            '--background': this.color.year.background,
            '--graph_foreground': this.color.graph_values.graph_foreground,
            '--graph_background': this.color.graph_values.graph_background,
            '--appriasal_name': this.color.appriasal_name,
            '--appriasal_rating': this.color.appriasal_rating,
            '--salary_change': this.color.salary_change,
            '--rewards': this.color.perfomance_history.rewards,
            '--appericiation': this.color.perfomance_history.appericiation,
            '--warning': this.color.perfomance_history.warning,
            '--perfomance_department': this.color.perfomance_department,
            '--appriasal_name_year': this.color.appriasal_name_year,
            '--arrow_designation': this.color.Arrows.arrow_designation,
            '--arrow_name': this.color.Arrows.arrow_name,
            '--arrow_department': this.color.arrow_department,
            '--font_color': this.color.Common.font_color,
            '--title_background_color':
              this.color.Common.title_background_color,
            '--title_font_color': this.color.Common.title_font_color,
            '--background_color': this.color.Common.background_color,
          },
        });
      });
  }

  ngOnInit() {
    let that = this;
    this.queryParams = this.route.snapshot.queryParams;
    this.allServicesService.getEmploymentStory().subscribe((result: any) => {
      // this.employeeTimeline = result.filter(
      //   (x: any) => x.employeeId == this.queryParams.employeeId
      // );
      const employee_data_year = Object.keys(result.data[0]);
      const employee_data : any = Object.values(result.data[0]);
      employee_data.map((result: any, index: any) => {
        var data : any = {};
        data = result[0];
        data.year = parseInt(employee_data_year[index])
        this.employeeTimeline.push(data);
        
      })
      this.employeeTimeline.reverse();
    });
  }

  ngAfterViewInit() {
    let that = this;
    that.setBreadcrumbs();
    this.cdf.detectChanges();
  }

  currentYear(event: any) {
    console.log('year', event.year);
  }
  BandClick(event: any) {
    console.log('Old Band', event.employee__histories_without_lm_group[1]?.old_label,'New Band',event.employee__histories_without_lm_group[1]?.new_label);
  }
  AppriasalName(event: any) {
    console.log('AppriasalName', event.employee_history_salary_change?.salary_change_label);
  }
  selfAssesment(event: any) {
    console.log('Self Assesment', event.employee_history_salary_change?.emp_rating);
  }
  LMAssesment(event: any) {
    console.log('LM Assesment', event.employee_history_salary_change?.lm_rating);
  }
  HRAssesment(event: any) {
    console.log('HR Assesment', event.employee_history_salary_change?.hr_rating);
  }
  salary(event: any) {
    console.log('Old Salary', event.employee_history_salary_change?.old_salary,
    'New Salary',event.employee_history_salary_change?.new_salary,
    'Change in Salary',event.employee_history_salary_change?.change_in_salary);
  }
  currentDesignation(event: any) {
    console.log('currentDesignation', event.employee__histories_without_lm_group[0]?.new_label);
  }
  currentDepartment(event: any) {
    console.log('currentDepartment', event.employee__histories_without_lm_group[2]?.new_label);
  }
  currentBranch(event: any) {
    console.log('currentBranch', event.employee__histories_without_lm_group[3]?.new_label);
  }
  startingDate(event: any) {
    console.log('startingDate', event.starting_date);
  }
  duration(event: any) {
    console.log('duration', event.employee__histories_without_lm_group[1]?.duration);
  }
  LMDuration(event: any) {
    console.log('LM Duration', event.duration);
  }
  LMName(event: any) {
    console.log('LM Name', event.new_label);
  }
  LMInfo(event: any) {
    console.log('LM Name', event.new_label , 'LM Duration' , event.duration);
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
