import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceHistoryGraphComponent } from './performance-history-graph.component';

describe('PerformanceHistoryGraphComponent', () => {
  let component: PerformanceHistoryGraphComponent;
  let fixture: ComponentFixture<PerformanceHistoryGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceHistoryGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceHistoryGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
