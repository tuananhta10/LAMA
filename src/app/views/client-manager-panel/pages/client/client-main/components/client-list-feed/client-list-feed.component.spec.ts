import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListFeedComponent } from './client-list-feed.component';

describe('ClientListFeedComponent', () => {
  let component: ClientListFeedComponent;
  let fixture: ComponentFixture<ClientListFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientListFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
