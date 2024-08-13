import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalAdminLoaderComponent } from './global-admin-loader.component';

describe('GlobalAdminLoaderComponent', () => {
  let component: GlobalAdminLoaderComponent;
  let fixture: ComponentFixture<GlobalAdminLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalAdminLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalAdminLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
