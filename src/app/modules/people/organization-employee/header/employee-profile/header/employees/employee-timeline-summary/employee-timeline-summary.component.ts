import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllServicesService } from 'src/app/services/all-services.service'

@Component({
  selector: 'app-employee-timeline-summary',
  templateUrl: './employee-timeline-summary.component.html',
  styleUrls: ['./employee-timeline-summary.component.scss']
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
      this.persons = this.persons.filter((x: any) => x.empID == this.queryParams.employeeId);
      console.log("timeline", this.persons);
    });
  }

}
