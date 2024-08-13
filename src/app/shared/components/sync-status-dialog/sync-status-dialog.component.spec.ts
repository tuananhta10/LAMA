import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncStatusDialogComponent } from './sync-status-dialog.component';

describe('SyncStatusDialogComponent', () => {
  let component: SyncStatusDialogComponent;
  let fixture: ComponentFixture<SyncStatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyncStatusDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
