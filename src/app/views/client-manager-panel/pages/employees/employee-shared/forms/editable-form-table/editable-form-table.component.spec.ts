import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableFormTableComponent } from './editable-form-table.component';

describe('EditableFormTableComponent', () => {
  let component: EditableFormTableComponent;
  let fixture: ComponentFixture<EditableFormTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableFormTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableFormTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
