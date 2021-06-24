import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleTabComponent } from './people-tab.component';

describe('PeopleTabComponent', () => {
  let component: PeopleTabComponent;
  let fixture: ComponentFixture<PeopleTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
