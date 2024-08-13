import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddXeroSettingComponent } from './add-xero-settings.component';

describe('AddXeroSettingComponent', () => {
  let component: AddXeroSettingComponent;
  let fixture: ComponentFixture<AddXeroSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddXeroSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddXeroSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
