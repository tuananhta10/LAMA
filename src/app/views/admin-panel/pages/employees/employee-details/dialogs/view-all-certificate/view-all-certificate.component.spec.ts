import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllCertificateComponent } from './view-all-certificate.component';

describe('ViewAllCertificateComponent', () => {
  let component: ViewAllCertificateComponent;
  let fixture: ComponentFixture<ViewAllCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
