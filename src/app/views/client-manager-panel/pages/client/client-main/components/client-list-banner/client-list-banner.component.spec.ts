import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListBannerComponent } from './client-list-banner.component';

describe('ClientListBannerComponent', () => {
  let component: ClientListBannerComponent;
  let fixture: ComponentFixture<ClientListBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientListBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
