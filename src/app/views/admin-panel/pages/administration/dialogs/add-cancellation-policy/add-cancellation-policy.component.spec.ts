import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCancellationPolicyComponent } from './add-cancellation-policy.component';

describe('AddCancellationPolicyComponent', () => {
  let component: AddCancellationPolicyComponent;
  let fixture: ComponentFixture<AddCancellationPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCancellationPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCancellationPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
