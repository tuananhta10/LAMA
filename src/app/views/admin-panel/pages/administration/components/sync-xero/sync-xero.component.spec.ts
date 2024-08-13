import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncXeroComponent } from './sync-xero.component';

describe('SyncXeroComponent', () => {
  let component: SyncXeroComponent;
  let fixture: ComponentFixture<SyncXeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyncXeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncXeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
