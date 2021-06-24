import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessMarixComponent } from './access-marix.component';

describe('AccessMarixComponent', () => {
  let component: AccessMarixComponent;
  let fixture: ComponentFixture<AccessMarixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessMarixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessMarixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
