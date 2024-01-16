import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendRequestsBarComponent } from './friend-requests-bar.component';

describe('FriendRequestsBarComponent', () => {
  let component: FriendRequestsBarComponent;
  let fixture: ComponentFixture<FriendRequestsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendRequestsBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FriendRequestsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
