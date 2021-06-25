import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  pending: string;
  description: number;
  approved: number;
  disapproved: string;
  total:number
}

const ELEMENT_DATA: PeriodicElement[] = [
  { description: 1, pending: 'Hydrogen', approved: 1.0079, disapproved: 'H' ,total:111},
  { description: 2, pending: 'Helium', approved: 4.0026, disapproved: 'He', total: 111 },
  { description: 3, pending: 'Lithium', approved: 6.941, disapproved: 'Li', total: 111 },
  { description: 4, pending: 'Beryllium', approved: 9.0122, disapproved: 'Be', total: 111},
  { description: 5, pending: 'Boron', approved: 10.811, disapproved: 'B', total: 111},
  { description: 6, pending: 'Carbon', approved: 12.0107, disapproved: 'C', total: 111},
  { description: 7, pending: 'Nitrogen', approved: 14.0067, disapproved: 'N', total: 111 },
  { description: 8, pending: 'Oxygen', approved: 15.9994, disapproved: 'O', total: 111},
  { description: 9, pending: 'Fluorine', approved: 18.9984, disapproved: 'F', total: 111},
  { description: 10, pending: 'Neon', approved: 20.1797, disapproved: 'Ne', total: 111 }
];

@Component({
  selector: 'anms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  displayedColumns: string[] = ['description', 'pending', 'approved', 'disapproved','total'];
  dataSource = ELEMENT_DATA;
  constructor() {}

  ngOnInit() {}
}
