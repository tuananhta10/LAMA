import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyBannerImageDialog } from './modify-banner-image-dialog.component';

describe('ModifyBannerImageDialog', () => {
  let component: ModifyBannerImageDialog;
  let fixture: ComponentFixture<ModifyBannerImageDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyBannerImageDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyBannerImageDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
