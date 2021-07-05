import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AllServicesService } from 'src/app/services/all-services.service'
import { ActivatedRoute } from "@angular/router";
import { ComParentChildService } from 'src/app/services/com-parent-child.service';
import { Subscription } from 'rxjs';
import cssVars from 'css-vars-ponyfill';


@Component({
  selector: 'anms-transfer-story',
  templateUrl: './transfer-story.component.html',
  styleUrls: ['./transfer-story.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TransferStoryComponent implements OnInit {
  employeeTimeline: any = {};
  year: any = {};
  years: Array<any> = [];
  designations: Array<string> = [];
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
      this.queryParams = this.route.snapshot.queryParams;
      const propertyValues1 = Object.keys(this.timelines);
      const propertyValues : any = Object.values(this.timelines);
      // this.employeeTimeline = this.timelines.find((x: any) => x.employeeId === this.queryParams.employeeId);
      for(var i = 0; i < propertyValues1.length; i++){
        this.year =  {};
        this.designations = [];
        this.year.year = parseInt(propertyValues1[i]);
        var value = propertyValues[i];
        var employeeDetail = value[0].employee_transfer__histories;
        // this.year.employee_transfer__histories = value[0].employee_transfer__histories;
        for(var j=0; j< employeeDetail.length; j++){
          if(employeeDetail[j].employee_event_name.name == 'Department') {
            this.year.department = employeeDetail[j].new_label;
          }
          else if(employeeDetail[j].employee_event_name.name == 'Designation') {

            employeeDetail[j].old_label ? this.designations.push(employeeDetail[j].old_label) : null;
            employeeDetail[j].new_label  ? this.designations.push(employeeDetail[j].new_label) : null;
            this.year.designations = this.designations;
          }
          else if(employeeDetail[j].employee_event_name.name == 'Office') {
            this.year.office = employeeDetail[j].new_label;
            this.year.city = employeeDetail[j].old_label;
          }
        }
        this.years.push(this.year);
      }

    })

  }

}
