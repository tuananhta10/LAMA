import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGroupGlobalComponent } from './select-group-global.component';

describe('SelectGroupGlobalComponent', () => {
  let component: SelectGroupGlobalComponent;
  let fixture: ComponentFixture<SelectGroupGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectGroupGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectGroupGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
