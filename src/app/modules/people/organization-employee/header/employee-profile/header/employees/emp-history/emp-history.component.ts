import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AllServicesService } from 'src/app/services/all-services.service'
import { ComParentChildService } from 'src/app/services/com-parent-child.service'
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'anms-emp-history',
  templateUrl: './emp-history.component.html',
  styleUrls: ['./emp-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EmpHistoryComponent implements OnInit {
  colors: any = {};
  queryParams: any = {};
  his_color: any = {};

  constructor(private httpClient: HttpClient,
    private allServicesService: AllServicesService,
    private comParentChildService: ComParentChildService,
    private route: ActivatedRoute) { }
  ngOnInit() {
    this.allServicesService.getColors().subscribe((data: any) => {
      this.his_color = data.data;
      console.log('colors',this.his_color)
     let that = this
      that.comParentChildService.publish('colors', this.his_color);
    })

  }
}
