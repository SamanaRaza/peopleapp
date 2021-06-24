import { Compiler, Component, ComponentFactoryResolver, Injector, OnDestroy, SimpleChange, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-org-employee-host',
  template: `<ng-template #hostComponent></ng-template>`
})
export class OrgEmpHostComponent implements OnInit, OnDestroy {
  @ViewChild('hostComponent', { read: ViewContainerRef }) hostComponent: ViewContainerRef;
  currentUrl: string = null;
  private destroy$ = new Subject();
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private vcref: ViewContainerRef,
    private injector: Injector, private route: ActivatedRoute, private router: Router, private compilor: Compiler) { }

  ngOnInit(): any {
    let that = this;
    this.currentUrl = /[^/]*$/.exec(this.router.url)[0];
    that.loadComponent(this.currentUrl);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async loadComponent(currentUrl: any) {
    let that = this;
    this.vcref.clear();
    let componentFactory;
    switch (currentUrl) {
      case 'company-setup':
        const { CompanySetupComponent } = await import('./company-setup/company-setup.component');
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(CompanySetupComponent);
        this.hostComponent.createComponent(componentFactory);
        break;
      case 'org-chart':
        const { OrgChartComponent } = await import('./org-chart/org-chart.component');
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(OrgChartComponent);
        this.hostComponent.createComponent(componentFactory);
        break;
      case 'access-matrix':
        const { AccessMarixComponent } = await import('./access-marix/access-marix.component');
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(AccessMarixComponent);
        this.hostComponent.createComponent(componentFactory);
        break;
      case 'hr-services':
        import('./employee-profile/header/header.component').then(c => {
          const ngModuleFactory = this.compilor.compileModuleSync(c.EmployeeProfileHeaderModule);
          const ngModule = ngModuleFactory.create(this.hostComponent.injector);
          const factory = ngModule.componentFactoryResolver.resolveComponentFactory(c.HeaderComponent);
          this.hostComponent.createComponent(factory);
        });
        break;
      // case 'employees':
      //   import('./employee-profile/employee-profile-tab/employee-profile-tab.component').then(c => {
      //     const ngModuleFactory = this.compilor.compileModuleSync(c.EmployeeProfileTabComponentModule);
      //     const ngModule = ngModuleFactory.create(this.hostComponent.injector);
      //     const factory = ngModule.componentFactoryResolver.resolveComponentFactory(c.EmployeeProfileTabComponent);
      //     this.hostComponent.createComponent(factory);
      //   });
      //   break;
      default:
        break;
    }


  }
}
