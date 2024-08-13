import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportWorkerAppComponent } from './support-worker-app.component';

describe('SupportWorkerAppComponent', () => {
  let component: SupportWorkerAppComponent;
  let fixture: ComponentFixture<SupportWorkerAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportWorkerAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportWorkerAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
