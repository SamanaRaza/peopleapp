import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferStoryComponent } from './transfer-story.component';

describe('TransferStoryComponent', () => {
  let component: TransferStoryComponent;
  let fixture: ComponentFixture<TransferStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferStoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
