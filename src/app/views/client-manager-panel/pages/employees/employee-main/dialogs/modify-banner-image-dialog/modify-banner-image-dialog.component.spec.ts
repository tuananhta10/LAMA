import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyBannerImageDialogComponent } from './modify-banner-image-dialog.component';

describe('ModifyBannerImageDialogComponent', () => {
  let component: ModifyBannerImageDialogComponent;
  let fixture: ComponentFixture<ModifyBannerImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyBannerImageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyBannerImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
