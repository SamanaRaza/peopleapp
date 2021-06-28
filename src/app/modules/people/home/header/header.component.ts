import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Breadcrumb } from '../../../../shared/breadcrumb/breadcrumb.model';
import { BreadcrumbService } from '../../../../shared/breadcrumb/breadcrumb.service';

export interface PeriodicElement {
  pending: number;
  description: string;
  approved: number;
  disapproved: number;
  total: number
}

const ELEMENT_DATA: PeriodicElement[] = [
  { description: 'Leave', pending: 150, approved: 866, disapproved: 15, total: 1031 },
  { description: 'Expense', pending: 6, approved: 110, disapproved: 11, total: 127 },
  { description: 'Travel', pending: 2, approved: 0, disapproved: 0, total: 2 },
  { description: 'Employee Exit', pending: 0, approved: 0, disapproved: 0, total: 0 },

];

@Component({
  selector: 'anms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['description', 'pending', 'approved', 'disapproved', 'total'];
  dataSource = ELEMENT_DATA;
  constructor(private readonly breadcrumbService: BreadcrumbService, private cdf: ChangeDetectorRef) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    let that = this;
    that.setBreadcrumbs();
  }

  setBreadcrumbs() {
    let that = this;
    let breadcrumbs: Breadcrumb[] = [];
    breadcrumbs.push({
      label: 'Home',
      url: '',
      params: {}
    });
    that.breadcrumbService.set(breadcrumbs);
    this.cdf.detectChanges();
  }
}
