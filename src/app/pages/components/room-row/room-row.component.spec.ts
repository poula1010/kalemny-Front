import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomRowComponent } from './room-row.component';

describe('RoomRowComponent', () => {
  let component: RoomRowComponent;
  let fixture: ComponentFixture<RoomRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
