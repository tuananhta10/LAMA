import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerageModalComponent } from './brokerage-modal.component';

describe('BrokerageModalComponent', () => {
  let component: BrokerageModalComponent;
  let fixture: ComponentFixture<BrokerageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerageModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
