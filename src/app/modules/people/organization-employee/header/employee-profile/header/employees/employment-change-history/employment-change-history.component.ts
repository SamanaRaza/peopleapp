import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EmploymentChangeHistoryService } from '../../../../../../../../services/employment-change-history.service';

@Component({
  selector: 'anms-employment-change-history',
  templateUrl: './employment-change-history.component.html',
  styleUrls: ['./employment-change-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EmploymentChangeHistoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  queryParams: any = {};
  columns: Array<any>;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  data: any
  constructor(private employmentChangeHistoryService: EmploymentChangeHistoryService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.queryParams = this.route.snapshot.queryParams;
    this.employmentChangeHistoryService.getEmployeeChangeHistroy().subscribe(data => {
      this.data = (data as any).data;
      console.log('emp', data)
      var filteredData = this.data.filter((x: any) => x.EmployeeProfileID == this.queryParams.employeeId);      // console.log('fiter',filteredData);
      this.dataSource = new MatTableDataSource(filteredData);
      this.dataSource.paginator = this.paginator

    }, error => console.error(error));

    this.displayedColumns = ['EmployeeProfileID', 'Changedby', 'ChangedDate', 'EmployementStatus', 'EmployementType', 'Designation', 'Band', 'LMs', 'Department', 'Branch'];
    this.columns = [
      { columnDef: 'EmployeeProfileID', header: 'Employee Profile Id', cell: (element: any) => `${element['EmployeeProfileID'] ? element['EmployeeProfileID'] : ``}`, color: 'red' },
      { columnDef: 'Changedby', header: 'Changed By', cell: (element: any) => `${element['Changedby'] ? element['Changedby'] : ``}`, color: 'red' },
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
