import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EmployeeSalaryHistoryService } from '../../../../../../../../services/employee-salary-history.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FixedAmountDialogComponent } from '../fixed-amount-dialog/fixed-amount-dialog.component';
import { VariableComponentsDialogComponent } from '../variable-components-dialog/variable-components-dialog.component';
@Component({
  selector: 'anms-employment-salary-change',
  templateUrl: './employment-salary-change.component.html',
  styleUrls: ['./employment-salary-change.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EmploymentSalaryChangeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  animal: string;
  name: string;
  queryParams: any = {};
  columns: Array<any>;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  data: any
  constructor(private employeeSaleryHistroyService: EmployeeSalaryHistoryService,
    private route: ActivatedRoute, public dialog: MatDialog) { }



  openFixed(): void {
    const dialogRef = this.dialog.open(FixedAmountDialogComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });
  }
  openVariable(): void {
    const dialogRef = this.dialog.open(VariableComponentsDialogComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });
  }
  ngOnInit(): void {

    this.queryParams = this.route.snapshot.queryParams;
    this.employeeSaleryHistroyService.getEmployeeSalaryHistroy().subscribe(data => {
      this.data = (data as any).data;
      var filteredData = this.data.filter((x: any) => x.EmployeeProfileID == this.queryParams.employeeId);
      console.log(filteredData);
      this.dataSource = new MatTableDataSource(filteredData);
      this.dataSource.paginator = this.paginator

    }, error => console.error(error));

    this.displayedColumns = ['EmployeeProfileID', 'ChangedBy', 'ChangedDate', 'Reason', 'BasicSalary', 'FixedComponents', 'VariableComponents'];
    this.columns = [
      { columnDef: 'EmployeeProfileID', header: 'Employee Profile Id', cell: (element: any) => `${element['EmployeeProfileID'] ? element['EmployeeProfileID'] : ``}`, color: 'red' },
      { columnDef: 'ChangedBy', header: 'Changed By', cell: (element: any) => `${element['ChangedBy'] ? element['ChangedBy'] : ``}`, color: 'red' },
      { columnDef: 'ChangedDate', header: 'Changed Date', cell: (element: any) => `${element['ChangedDate'] ? element['ChangedDate'] : ``}` },
      { columnDef: 'Reason', header: 'Reason', cell: (element: any) => `${element['Reason'] ? element['Reason'] : ``}` },
      { columnDef: 'BasicSalary', header: 'BasicSalary', cell: (element: any) => `${element['BasicSalary'] ? element['BasicSalary'] : ``}` },
      { columnDef: 'FixedComponents', header: 'Fixed Components', cell: (element: any) => `${element['FixedComponents'] ? element['FixedComponents'] : ``}` },
      { columnDef: 'VariableComponents', header: 'Variable Components', cell: (element: any) => `${element['VariableComponents'] ? element['VariableComponents'] : ``}` },
    ]

  }
}




