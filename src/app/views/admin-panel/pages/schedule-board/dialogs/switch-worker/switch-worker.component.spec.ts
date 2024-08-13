import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchWorkerComponent } from './switch-worker.component';

describe('SwitchWorkerComponent', () => {
  let component: SwitchWorkerComponent;
  let fixture: ComponentFixture<SwitchWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchWorkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
