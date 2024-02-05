import { Component, Input, OnInit } from '@angular/core';
import { UserDto } from '../../../../testpage/friends-bar/friend-row/friend-row.component';
import { RoomService } from '../../../../services/room.service';

@Component({
  selector: 'app-friend-dm-select',
  standalone: true,
  imports: [],
  templateUrl: './friend-dm-select.component.html',
  styleUrl: './friend-dm-select.component.css'
})
export class FriendDmSelectComponent implements OnInit {
  constructor(private roomService: RoomService) { }
  state: boolean;
  ngOnInit(): void {
    this.state = false;
    this.imageSrc = "/assets/" + this.user.image;
  }
  @Input()
  user: UserDto;

  imageSrc: string;

  toggleChecked() {
    this.state = !this.state;
    if (this.state === false) {
      this.roomService.createRoomUsers.delete(this.user.id);
    }
    else {
      this.roomService.createRoomUsers.add(this.user.id);
    }
  }
}
