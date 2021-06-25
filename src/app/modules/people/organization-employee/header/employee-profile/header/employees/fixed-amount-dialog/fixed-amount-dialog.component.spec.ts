import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAmountDialogComponent } from './fixed-amount-dialog.component';

describe('FixedAmountDialogComponent', () => {
  let component: FixedAmountDialogComponent;
  let fixture: ComponentFixture<FixedAmountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedAmountDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAmountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
