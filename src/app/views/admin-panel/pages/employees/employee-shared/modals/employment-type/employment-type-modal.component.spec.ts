import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentTypeModalComponent } from './employment-type-modal.component';

describe('EmploymentTypeModalComponent', () => {
  let component: EmploymentTypeModalComponent;
  let fixture: ComponentFixture<EmploymentTypeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentTypeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
