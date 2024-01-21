import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingFriendRequestsComponent } from './incoming-friend-requests.component';

describe('IncomingFriendRequestsComponent', () => {
  let component: IncomingFriendRequestsComponent;
  let fixture: ComponentFixture<IncomingFriendRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomingFriendRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncomingFriendRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
