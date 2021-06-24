import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandDesignationGraphComponent } from './band-designation-graph.component';

describe('BandDesignationGraphComponent', () => {
  let component: BandDesignationGraphComponent;
  let fixture: ComponentFixture<BandDesignationGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandDesignationGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandDesignationGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
