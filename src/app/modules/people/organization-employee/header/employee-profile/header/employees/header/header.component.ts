import { Component, OnInit, NgModule, ViewChild, ChangeDetectorRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeesService } from "../../../../../../../../services/employees.service";
import { SharedModule } from '../../../../../../../../shared/shared.module';
import { Breadcrumb } from '../../../../../../../..//shared/breadcrumb/breadcrumb.model';
import { BreadcrumbService } from '../../../../../../../../shared/breadcrumb/breadcrumb.service';

export interface Employee {
  empID: number;
  designation: string;
  department: string;
  band: string;
  joiningDate: string;
  status: string;
}

export class MatMenuListItem {
  menuLinkText: string;
  path: string;
  isDisabled: boolean;
}

@Component({
  selector: 'anms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EmpHeaderComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  show: boolean;
  dataSource: MatTableDataSource<Employee>;
  @ViewChild(MatTable) dtable: MatTable<Employee>;
  data: any;
  sortData: any;
  filterData: string;
  searchData: any;
  columns: Array<any>;
  displayedColumns: string[];

  filter: any
  activeList = ['Yes', 'No'];
  employeeSort = [
    { value: 1, sort: 'A to Z' },
    { value: 2, sort: 'Z to A' }
  ]
  activeEmployees = [
    { value: 'Active', status: 'Active Employee' },
    { value: 'Non Active', status: 'Non Active Employee' }
  ]
  searchBy = [
    { value: 'all', search: 'All' },
    { value: 'empID', search: 'Employee Id' },
    { value: 'name', search: 'Name' },
    { value: 'designation', search: 'Designation' },
    { value: 'department', search: 'Department' },
    { value: 'band', search: 'Band' },
  ]
  menuListItems: MatMenuListItem[];

  activeVal: any
  constructor(private employeeService: EmployeesService, private router: Router, private cdf: ChangeDetectorRef, private readonly breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    let that = this;
    this.displayedColumns = ['empID', 'name', 'designation', 'department', 'band', 'joiningDate', 'status'];
    this.columns = [
      { columnDef: 'empID', header: 'Employee ID', cell: (element: any) => `${element['empID'] ? element['empID'] : ``}`, color: 'red' },
      { columnDef: 'name', header: 'Name', cell: (element: any) => `${element['name'] ? element['name'] : ``}`, color: 'red' },
      { columnDef: 'designation', header: 'Designation', cell: (element: any) => `${element['designation'] ? element['designation'] : ``}` },
      { columnDef: 'department', header: 'Department', cell: (element: any) => `${element['department'] ? element['department'] : ``}` },
      { columnDef: 'band', header: 'Band', cell: (element: any) => `${element['band'] ? element['band'] : ``}` },
      { columnDef: 'joiningDate', header: 'Joining Date', cell: (element: any) => `${element['joiningDate'] ? element['joiningDate'] : ``}` },
      { columnDef: 'status', header: 'Status', cell: (element: any) => `${element['status'] ? element['status'] : ``}` }
    ]

    this.loadData()
    this.menuListItems = [
      {
        menuLinkText: 'View Employee Profile',
        path: 'ViewEmployeeProfile',
        isDisabled: false
      },
      {
        menuLinkText: 'Edit Employee Profile',
        path: 'EditEmployeeProfile',
        isDisabled: false
      },
      {
        menuLinkText: 'Employee Calendar',
        path: 'EmployeeCalendar',
        isDisabled: false
      },
      {
        menuLinkText: 'Employee Leave Balance',
        path: 'EmployeeLeaveBalance',
        isDisabled: true
      },
      {
        menuLinkText: 'Attendance Summary',
        path: 'AttendanceSummary',
        isDisabled: true
      },
      {
        menuLinkText: 'Employment History',
        path: 'empHistory',
        isDisabled: true
      },
      {
        menuLinkText: 'Employment Change Log',
        path: 'EmploymentChangeLog',
        isDisabled: true
      },
      {
        menuLinkText: 'Employment Salary Change',
        path: 'EmploymentSalaryChange',
        isDisabled: true
      }
    ]
  }

  ngAfterViewInit(): void {
    let that = this;
    that.setBreadcrumbs();

  }

  loadData() {
    let that = this;
    this.employeeService.getEmployees().subscribe(data => {
      this.data = (data as any).data;
      this.dataSource = new MatTableDataSource((data as any).data);
      this.dataSource.paginator = this.paginator;

      this.dataSource.filterPredicate = function(data1 : any, filter: string): boolean {
        if(that.searchData == "empID") {
          return data1[that.searchData] ==filter ;
        }
        else {
          if(that.searchData == "all"){
            return true;
          }
          else
          {
            return data1[that.searchData].toLowerCase().includes(filter);
          }
        }

      };

    }, error => console.error(error));
  }

  searchByValues(event: any) {
    let that = this;
    if (event != "all") {

    }
    else {
      that.filter = null;
      this.applyFilter();
    }

  }

  applyFilter() {
    if (this.filter) {
      const filterValue = this.filter;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.cdf.detectChanges();
    }
    else {
      this.loadData();
      if(this.activeVal) {
        this.changeStatus(null, this.activeVal);
      }
      this.cdf.detectChanges();
    }
  }

  changeStatus(e: any, status: any) {
    var value = e ? e.value : status;
    this.employeeService.getEmployees().subscribe(data => {
      var newData = (data as any).data;
      this.data = newData.filter((x: any) => x.status === value);
      if(this.sortData) {
        this.changeOrder(null, this.sortData)
      }

    });
  }

  compare(a: any, b: any) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  changeOrder(e: any, sort: any) {
    var value = e ? e.value : sort;
    if (value === 1) {
      this.data.sort(this.compare);
    }
    else if (value === 2) {
      this.data.sort(this.compare).reverse();
    }
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dtable.renderRows();
  }

  navigate(path?: any, id?: any) {
    let that = this;
    console.log(id);
    console.log(path);
    if (path === 'EmploymentSalaryChange') {
      that.router.navigate(['/people/organization-employee/hr-services/emp-profile/employees/salary-change'], {
        queryParams: {
          employeeId: id,
        }
      });
    }
    else if (path === 'EmploymentChangeLog') {
      that.router.navigate(['/people/organization-employee/hr-services/emp-profile/employees/EmploymentChangeLog'], {
        queryParams: {
          employeeId: id,
        }
      });
    }
    else if (path === 'empHistory') {
      that.router.navigate(['/people/organization-employee/hr-services/emp-profile/employees/empHistory'], {
        queryParams: {
          employeeId: id,
        }
      });
    }
  }

  setBreadcrumbs() {
    let that = this;
    let breadcrumbs: Breadcrumb[] = [];
    breadcrumbs.push({
      label: 'HR Services',
      url: '/people/organization-employee/hr-services',
      params: {}
    });
    breadcrumbs.push({
      label: 'Employee Profile',
      url: '',
      params: {}
    });
    that.breadcrumbService.set(breadcrumbs);
    this.cdf.detectChanges();
  }

}
@NgModule({
  declarations: [EmpHeaderComponent],
  imports: [SharedModule]
})
export class EmployeesHeaderComponentModule { }
