import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendRequestRowComponent } from './friend-request-row.component';

describe('FriendRequestRowComponent', () => {
  let component: FriendRequestRowComponent;
  let fixture: ComponentFixture<FriendRequestRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendRequestRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FriendRequestRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
