import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBranchModalComponent } from './main-branch-modal.component';

describe('MainBranchModalComponent', () => {
  let component: MainBranchModalComponent;
  let fixture: ComponentFixture<MainBranchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainBranchModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBranchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
