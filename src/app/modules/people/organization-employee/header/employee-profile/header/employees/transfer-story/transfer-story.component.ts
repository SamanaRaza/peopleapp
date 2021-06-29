import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AllServicesService } from 'src/app/services/all-services.service'
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'anms-transfer-story',
  templateUrl: './transfer-story.component.html',
  styleUrls: ['./transfer-story.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TransferStoryComponent implements OnInit {
  employeeTimeline: any = {};
  queryParams: any = {};
  timelines: any = {};

  constructor(private httpClient: HttpClient,
    private allServicesService: AllServicesService,
    private route: ActivatedRoute) { }
  ngOnInit() {
    this.allServicesService.getTransferStory().subscribe((data: any) => {
      this.timelines = data.data;
      let id = this.route.snapshot.paramMap.get('id');
      this.queryParams = this.route.snapshot.queryParams;
      this.employeeTimeline = this.timelines.find((x: any) => x.employeeId === this.queryParams.employeeId);

    })

  }

}
