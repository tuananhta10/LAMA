import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreDefinedProviderModalComponent } from './pre-defined-provider-modal.component';

describe('PreDefinedProviderModalComponent', () => {
  let component: PreDefinedProviderModalComponent;
  let fixture: ComponentFixture<PreDefinedProviderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreDefinedProviderModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreDefinedProviderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
