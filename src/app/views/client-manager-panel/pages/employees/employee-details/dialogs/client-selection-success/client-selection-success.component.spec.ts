import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSelectionSuccessComponent } from './client-selection-success.component';

describe('ClientSelectionSuccessComponent', () => {
  let component: ClientSelectionSuccessComponent;
  let fixture: ComponentFixture<ClientSelectionSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSelectionSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSelectionSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
