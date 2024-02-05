import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToDmComponent } from './add-to-dm.component';

describe('AddToDmComponent', () => {
  let component: AddToDmComponent;
  let fixture: ComponentFixture<AddToDmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToDmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddToDmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
