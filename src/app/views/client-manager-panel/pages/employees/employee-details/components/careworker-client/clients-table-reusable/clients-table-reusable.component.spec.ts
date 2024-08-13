import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsTableReusableComponent } from './clients-table-reusable.component';

describe('ClientsTableReusableComponent', () => {
  let component: ClientsTableReusableComponent;
  let fixture: ComponentFixture<ClientsTableReusableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsTableReusableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsTableReusableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
