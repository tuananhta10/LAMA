import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListSimpleDetailDialogComponent } from './client-list-simple-detail-dialog.component';

describe('ClientListSimpleDetailDialogComponent', () => {
  let component: ClientListSimpleDetailDialogComponent;
  let fixture: ComponentFixture<ClientListSimpleDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientListSimpleDetailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListSimpleDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
