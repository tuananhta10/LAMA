import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkCommunicationGroupComponent } from './bulk-communication-group.component';

describe('BulkCommunicationGroupComponent', () => {
  let component: BulkCommunicationGroupComponent;
  let fixture: ComponentFixture<BulkCommunicationGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkCommunicationGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkCommunicationGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
