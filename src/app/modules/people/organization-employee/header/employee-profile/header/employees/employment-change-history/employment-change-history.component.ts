import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from 'src/app/shared/breadcrumb/breadcrumb.model';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';
import {AllServicesService} from 'src/app/services/all-services.service'
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
  constructor(private allServicesService: AllServicesService, private readonly breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute, private cdf: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.queryParams = this.route.snapshot.queryParams;
    this.allServicesService.getEmployeeChangeHistroy().subscribe(data => {
      this.data = (data as any).data;
      console.log('emp', data)
      var filteredData = this.data.filter((x: any) => x.EmployeeProfileID == this.queryParams.employeeId);      // console.log('fiter',filteredData);
      this.dataSource = new MatTableDataSource(filteredData);
      this.dataSource.paginator = this.paginator

    }, error => console.error(error));

    this.displayedColumns = ['Changedby', 'ChangedDate', 'EmployementStatus', 'EmployementType', 'Designation', 'Band', 'LMs', 'Department', 'Branch'];
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

  ngAfterViewInit() {
    let that = this;
    that.setBreadcrumbs();
    this.cdf.detectChanges();
  }

  setBreadcrumbs() {
    let that = this;
    let breadcrumbs: Breadcrumb[] = [];
    breadcrumbs.push({
      label: 'Org & Emp',
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
      label: 'Employment Change',
      url: '',
      params: {}
    });
    that.breadcrumbService.set(breadcrumbs);
  }
}
