import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditColumnDialogComponent } from './edit-column-dialog.component';

describe('EditColumnDialogComponent', () => {
  let component: EditColumnDialogComponent;
  let fixture: ComponentFixture<EditColumnDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditColumnDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditColumnDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
