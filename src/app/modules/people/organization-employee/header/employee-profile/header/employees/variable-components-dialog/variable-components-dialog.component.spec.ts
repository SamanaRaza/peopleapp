import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableComponentsDialogComponent } from './variable-components-dialog.component';

describe('VariableComponentsDialogComponent', () => {
  let component: VariableComponentsDialogComponent;
  let fixture: ComponentFixture<VariableComponentsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariableComponentsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableComponentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
