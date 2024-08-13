import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncMyobComponent } from './sync-myob.component';

describe('SyncMyobComponent', () => {
  let component: SyncMyobComponent;
  let fixture: ComponentFixture<SyncMyobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyncMyobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncMyobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
