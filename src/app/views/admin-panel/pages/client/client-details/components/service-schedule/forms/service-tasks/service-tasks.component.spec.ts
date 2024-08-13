import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTasksComponent } from './service-tasks.component';

describe('ServiceTasksComponent', () => {
  let component: ServiceTasksComponent;
  let fixture: ComponentFixture<ServiceTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
