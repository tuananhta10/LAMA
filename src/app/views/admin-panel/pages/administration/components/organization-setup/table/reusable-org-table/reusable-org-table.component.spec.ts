import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableOrgTableComponent } from './reusable-org-table.component';

describe('ReusableOrgTableComponent', () => {
  let component: ReusableOrgTableComponent;
  let fixture: ComponentFixture<ReusableOrgTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusableOrgTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableOrgTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
