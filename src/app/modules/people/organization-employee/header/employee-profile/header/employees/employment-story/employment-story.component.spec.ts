import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentStoryComponent } from './employment-story.component';

describe('EmploymentStoryComponent', () => {
  let component: EmploymentStoryComponent;
  let fixture: ComponentFixture<EmploymentStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentStoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
