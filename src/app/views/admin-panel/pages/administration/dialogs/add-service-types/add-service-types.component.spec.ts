import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceTypesComponent } from './add-service-types.component';

describe('AddServiceTypesComponent', () => {
  let component: AddServiceTypesComponent;
  let fixture: ComponentFixture<AddServiceTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddServiceTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServiceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
