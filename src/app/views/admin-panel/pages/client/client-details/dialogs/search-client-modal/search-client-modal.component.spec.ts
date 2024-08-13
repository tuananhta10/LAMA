import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareWorkerModalComponent } from './care-worker-modal.component';

describe('CareWorkerModalComponent', () => {
  let component: CareWorkerModalComponent;
  let fixture: ComponentFixture<CareWorkerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareWorkerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareWorkerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
