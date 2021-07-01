import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AllServicesService } from 'src/app/services/all-services.service'
import { ActivatedRoute } from "@angular/router";
import { ComParentChildService } from 'src/app/services/com-parent-child.service';
import { Subscription } from 'rxjs';

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
  private subscription: Subscription;
  constructor(private httpClient: HttpClient,
    private allServicesService: AllServicesService,
    private route: ActivatedRoute, private comParentChildService: ComParentChildService) {
    this.subscription = this.comParentChildService.on('colors').subscribe(color => {
      console.log('Colors3', color)
     })}

  ngOnInit() {
    this.allServicesService.getTransferStory().subscribe((data: any) => {
      this.timelines = data.data;
      let id = this.route.snapshot.paramMap.get('id');
      this.queryParams = this.route.snapshot.queryParams;
      this.employeeTimeline = this.timelines.find((x: any) => x.employeeId === this.queryParams.employeeId);

    })

  }

}
