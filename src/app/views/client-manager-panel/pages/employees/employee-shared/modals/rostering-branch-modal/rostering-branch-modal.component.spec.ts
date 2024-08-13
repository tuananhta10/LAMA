import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosteringBranchModalComponent } from './rostering-branch-modal.component';

describe('RosteringBranchModalComponent', () => {
  let component: RosteringBranchModalComponent;
  let fixture: ComponentFixture<RosteringBranchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RosteringBranchModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RosteringBranchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
