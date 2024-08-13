import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrateLoadingComponent } from './payrate-loading.component';

describe('PayrateLoadingComponent', () => {
  let component: PayrateLoadingComponent;
  let fixture: ComponentFixture<PayrateLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrateLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrateLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
