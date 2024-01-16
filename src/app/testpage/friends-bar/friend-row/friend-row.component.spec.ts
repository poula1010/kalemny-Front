import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendRowComponent } from './friend-row.component';

describe('FriendRowComponent', () => {
  let component: FriendRowComponent;
  let fixture: ComponentFixture<FriendRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FriendRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
