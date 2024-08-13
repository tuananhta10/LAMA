import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListTableComponent } from './client-list-table.component';

describe('ClientListTableComponent', () => {
  let component: ClientListTableComponent;
  let fixture: ComponentFixture<ClientListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientListTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
