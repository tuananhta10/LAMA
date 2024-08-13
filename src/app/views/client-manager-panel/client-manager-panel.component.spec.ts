import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientManagerPanelComponent } from './client-manager-panel.component';

describe('ClientManagerPanelComponent', () => {
  let component: ClientManagerPanelComponent;
  let fixture: ComponentFixture<ClientManagerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientManagerPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientManagerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
