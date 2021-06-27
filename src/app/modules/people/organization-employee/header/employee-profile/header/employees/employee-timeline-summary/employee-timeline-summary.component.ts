import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeesDataService } from 'src/app/services/employees-data.service';

@Component({
  selector: 'app-employee-timeline-summary',
  templateUrl: './employee-timeline-summary.component.html',
  styleUrls: ['./employee-timeline-summary.component.scss']
})
export class EmployeeTimelineSummaryComponent implements OnInit {
  queryParams: any = {};

  constructor(
    private route: ActivatedRoute, private employeesDataService: EmployeesDataService) { }
  persons: any = []
  ngOnInit(): void {
    this.queryParams = this.route.snapshot.queryParams;
    this.employeesDataService.getJSON().subscribe(data => {
      this.persons = (data as any).data;
      this.persons = this.persons.filter((x: any) => x.empID == this.queryParams.employeeId);
      console.log("timeline", this.persons);
    });
  }

}
