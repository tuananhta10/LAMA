import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpenseTypeListComponent } from './add-expense-type-list.component';

describe('AddExpenseTypeListComponent', () => {
  let component: AddExpenseTypeListComponent;
  let fixture: ComponentFixture<AddExpenseTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExpenseTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpenseTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
