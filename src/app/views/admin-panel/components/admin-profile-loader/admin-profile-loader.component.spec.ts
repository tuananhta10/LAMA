import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfileLoaderComponent } from './admin-profile-loader.component';

describe('AdminProfileLoaderComponent', () => {
  let component: AdminProfileLoaderComponent;
  let fixture: ComponentFixture<AdminProfileLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProfileLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfileLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
