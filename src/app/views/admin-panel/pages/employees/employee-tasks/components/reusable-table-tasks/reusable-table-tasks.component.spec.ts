import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableTableTasksComponent } from './reusable-table-tasks.component';

describe('ReusableTableTasksComponent', () => {
  let component: ReusableTableTasksComponent;
  let fixture: ComponentFixture<ReusableTableTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusableTableTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableTableTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
