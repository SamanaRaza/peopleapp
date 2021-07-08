import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AllServicesService } from 'src/app/services/all-services.service'
import { ActivatedRoute } from "@angular/router";
import { ComParentChildService } from 'src/app/services/com-parent-child.service';
import { Subscription } from 'rxjs';
import cssVars from 'css-vars-ponyfill';
import { EmployeeTransferHistories } from "src/app/constants/constants";


@Component({
  selector: 'anms-transfer-story',
  templateUrl: './transfer-story.component.html',
  styleUrls: ['./transfer-story.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TransferStoryComponent implements OnInit {
  employeeTimeline: any = {};
  isData : boolean = false;
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
        this.isData = false;
        this.designations = [];
        this.year.year = parseInt(propertyValues1[i]);
        var value = propertyValues[i];
        var employeeDetail = value[0].employee_transfer__histories;
        // this.year.employee_transfer__histories = value[0].employee_transfer__histories;
        for(var j=0; j< employeeDetail.length; j++){
          if(employeeDetail[j].employee_event_name.name == EmployeeTransferHistories.Department) {
            this.isData = true;
            this.year.department = employeeDetail[j].new_label;
          }
          else if(employeeDetail[j].employee_event_name.name == EmployeeTransferHistories.Designation) {
            this.isData = true;
            employeeDetail[j].old_label ? this.designations.push(employeeDetail[j].old_label) : null;
            employeeDetail[j].new_label  ? this.designations.push(employeeDetail[j].new_label) : null;
            this.year.designations = this.designations;
          }
          else if(employeeDetail[j].employee_event_name.name == EmployeeTransferHistories.Office) {
            this.isData = true;
            this.year.office = employeeDetail[j].new_label;
          }
          else if(employeeDetail[j].employee_event_name.name == EmployeeTransferHistories.Location) {
            this.isData = true;
            this.year.location = employeeDetail[j].new_label;
          }
        }
        if(this.isData == true) {
          this.years.push(this.year);
        }
      }

    })

  }
  empYear(event:any){
    console.log('Year',event.year)
  }
  department(event:any){
    console.log('Department',event.department)
  }
  office(event:any){
    console.log('Office',event.office)
  }
  location(event:any){
    console.log('Location',event.location)
  }
  Designation(event:any){
    console.log('Designation',event)
  }
}
