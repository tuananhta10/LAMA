import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkCommunicationGroupComponent } from './add-bulk-communication-group.component';

describe('AddBulkCommunicationGroupComponent', () => {
  let component: AddBulkCommunicationGroupComponent;
  let fixture: ComponentFixture<AddBulkCommunicationGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBulkCommunicationGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBulkCommunicationGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
