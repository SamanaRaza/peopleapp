import { AfterViewInit, Compiler, Component, ComponentFactoryResolver, Injector, OnDestroy, SimpleChange, ViewChild, ViewContainerRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ComponentDirective } from '../../../../../shared/directive/component.directive';

@Component({
  selector: 'app-employee-profile-host',
  template: `<ng-template component-host></ng-template>`
})
export class EmpProfileHostComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(ComponentDirective) componentHost: ComponentDirective;

  private hostviewcontainerref: ViewContainerRef;
  isLoad: boolean = false;
  interval: any;
  currentUrl: string = "";
  private destroy$ = new Subject();
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private vcref: ViewContainerRef,
    private injector: Injector, private route: ActivatedRoute, private router: Router, private compilor: Compiler) { }

  ngOnInit(): any {
    let that = this;
    this.currentUrl = /[^/]*$/.exec(this.router.url)[0];
    this.loadComponent(this.currentUrl);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit() {
  }

  loadComponent(currentUrl: any) {
    let that = this;
    this.isLoad = true;
    let componentFactory;
    switch (currentUrl) {
      case 'employees':
        import('../employee-profile/header/employees/header/header.component').then(
          ({ EmpHeaderComponent }) => {
            componentFactory = that.componentFactoryResolver.resolveComponentFactory(EmpHeaderComponent);
            const viewContainerRef = that.componentHost.viewContainerRef;
            viewContainerRef.clear();
            viewContainerRef.createComponent(componentFactory);

          }
        )
        break;
      case 'analytics':
        import('../employee-profile/header/analytics/analytics.component').then(
          ({ AnalyticsComponent }) => {
            componentFactory = that.componentFactoryResolver.resolveComponentFactory(AnalyticsComponent);
            const viewContainerRef = that.componentHost.viewContainerRef;
            viewContainerRef.clear();
            viewContainerRef.createComponent(componentFactory);
          }
        )
        break;
      case 'histroy-reports':
        import('../employee-profile/header/histroy-sports/histroy-sports.component').then(
          ({ HistroySportsComponent }) => {
            componentFactory = that.componentFactoryResolver.resolveComponentFactory(HistroySportsComponent);
            const viewContainerRef = that.componentHost.viewContainerRef;
            viewContainerRef.clear();
            viewContainerRef.createComponent(componentFactory);
          }
        )
        break;
      default:
        break;
    }


  }

}
