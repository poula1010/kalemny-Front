import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendDmSelectComponent } from './friend-dm-select.component';

describe('FriendDmSelectComponent', () => {
  let component: FriendDmSelectComponent;
  let fixture: ComponentFixture<FriendDmSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendDmSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FriendDmSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
