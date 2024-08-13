import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncToXeroDialogComponent } from './sync-to-xero-dialog.component';

describe('SyncToXeroDialogComponent', () => {
  let component: SyncToXeroDialogComponent;
  let fixture: ComponentFixture<SyncToXeroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyncToXeroDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncToXeroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
