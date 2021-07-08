import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllServicesService } from 'src/app/services/all-services.service'

@Component({
  selector: 'app-employee-timeline-summary',
  templateUrl: './employee-timeline-summary.component.html',
  styleUrls: ['./employee-timeline-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EmployeeTimelineSummaryComponent implements OnInit {
  queryParams: any = {};

  constructor(
    private route: ActivatedRoute, private allServicesService: AllServicesService) { }
  persons: any = []
  ngOnInit(): void {
    this.queryParams = this.route.snapshot.queryParams;
    this.allServicesService.getEmpDetails().subscribe((data:any) => {
      this.persons = (data as any).data;
      // this.persons = this.persons.filter((x: any) => x.empID == this.queryParams.employeeId);
    });
  }
  empName(event:any){
    console.log('Employee Name', event.emp_name);
  }
  endingDesignation(event:any){
    console.log('Ending Designation', event.ending_designation);
  }
  endingDepartment(event:any){
    console.log('Ending Department', event.ending_department);
  }
  years(event:any){
    console.log('Starting Year', event.starting_year, '- Ending Year',event.ending_year);
  }
  bands(event:any){
    console.log('Latest Band', event.latest_band, '- Ending Band',event.ending_band);
  }
  designations(event:any){
    console.log('Starting Designation', event.starting_designation, '- Ending Designation',event.ending_designation);
  }
  

}
