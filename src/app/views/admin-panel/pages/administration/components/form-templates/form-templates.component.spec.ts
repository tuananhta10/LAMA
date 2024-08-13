import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTemplatesComponent } from './form-templates.component';

describe('FormTemplatesComponent', () => {
  let component: FormTemplatesComponent;
  let fixture: ComponentFixture<FormTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
