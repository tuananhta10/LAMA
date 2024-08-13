import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientChecklistComponent } from './add-client-checklist.component';

describe('AddClientChecklistComponent', () => {
  let component: AddClientChecklistComponent;
  let fixture: ComponentFixture<AddClientChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClientChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
