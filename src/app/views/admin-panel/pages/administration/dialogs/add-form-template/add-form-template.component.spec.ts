import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormTemplateComponent } from './add-form-template.component';

describe('AddFormTemplateComponent', () => {
  let component: AddFormTemplateComponent;
  let fixture: ComponentFixture<AddFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFormTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
