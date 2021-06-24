import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistroySportsComponent } from './histroy-sports.component';

describe('HistroySportsComponent', () => {
  let component: HistroySportsComponent;
  let fixture: ComponentFixture<HistroySportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistroySportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistroySportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
