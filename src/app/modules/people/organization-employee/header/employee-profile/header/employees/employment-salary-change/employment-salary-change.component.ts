import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EmployeeSalaryHistoryService } from '../../../../../../../../services/employee-salary-history.service';

@Component({
  selector: 'anms-employment-salary-change',
  templateUrl: './employment-salary-change.component.html',
  styleUrls: ['./employment-salary-change.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EmploymentSalaryChangeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  queryParams: any = {};
  columns: Array<any>;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  data: any
  constructor(private employeeSaleryHistroyService: EmployeeSalaryHistoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.queryParams = this.route.snapshot.queryParams;
    this.employeeSaleryHistroyService.getEmployeeSalaryHistroy().subscribe(data => {
      this.data = (data as any).data;
      var filteredData = this.data.filter((x: any) => x.EmployeeProfileID == this.queryParams.employeeId);
      console.log(filteredData);
      this.dataSource = new MatTableDataSource(filteredData);
      this.dataSource.paginator = this.paginator

    }, error => console.error(error));

    this.displayedColumns = ['EmployeeProfileID', 'ChangedBy', 'ChangedDate', 'EmployementStatus', 'EmployementType', 'Designation', 'Band', 'LMs', 'Department', 'Branch'];
    this.columns = [
      { columnDef: 'EmployeeProfileID', header: 'Employee Profile Id', cell: (element: any) => `${element['EmployeeProfileID'] ? element['EmployeeProfileID'] : ``}`, color: 'red' },
      { columnDef: 'ChangedBy', header: 'Changed By', cell: (element: any) => `${element['ChangedBy'] ? element['ChangedBy'] : ``}`, color: 'red' },
      { columnDef: 'ChangedDate', header: 'Changed Date', cell: (element: any) => `${element['ChangedDate'] ? element['ChangedDate'] : ``}` },
      { columnDef: 'EmployementStatus', header: 'Employement Status', cell: (element: any) => `${element['EmployementStatus'] ? element['EmployementStatus'] : ``}` },
      { columnDef: 'EmployementType', header: 'Employement Type', cell: (element: any) => `${element['EmployementType'] ? element['EmployementType'] : ``}` },
      { columnDef: 'Designation', header: 'Designation', cell: (element: any) => `${element['Designation'] ? element['Designation'] : ``}` },
      { columnDef: 'Band', header: 'Band', cell: (element: any) => `${element['Band'] ? element['Band'] : ``}` },
      { columnDef: 'LMs', header: 'LMs', cell: (element: any) => `${element['LMs'] ? element['LMs'] : ``}` },
      { columnDef: 'Department', header: 'Department', cell: (element: any) => `${element['Department'] ? element['Department'] : ``}` },
      { columnDef: 'Branch', header: 'Branch', cell: (element: any) => `${element['Branch'] ? element['Branch'] : ``}` }
    ]

  }
}
