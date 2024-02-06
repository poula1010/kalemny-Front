import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FriendsService } from '../../../services/friends.service';
import { UserDto } from '../../../testpage/friends-bar/friend-row/friend-row.component';
import { Subscription } from 'rxjs';
import { FriendDmSelectComponent } from './friend-dm-select/friend-dm-select.component';
import { RoomService } from '../../../services/room.service';
import { AuthService } from '../../../services/auth.service';
import { RoomDto } from '../../../interfaces/RoomDto';

@Component({
  selector: 'app-add-to-dm',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FriendDmSelectComponent],
  templateUrl: './add-to-dm.component.html',
  styleUrl: './add-to-dm.component.css'
})
export class AddToDmComponent implements OnInit, OnDestroy {
  constructor(private friendsService: FriendsService, private roomService: RoomService, private authService: AuthService) { }
  ngOnDestroy(): void {
    this.friendsSub.unsubscribe();
    this.roomService.createRoomUsers = null;
    this.roomService.createRoomUsernames = null;
  }
  friendsList: UserDto[];
  TestDto: UserDto;
  friendsSub: Subscription;
  ngOnInit(): void {
    this.roomService.createRoomUsers = new Set();
    this.roomService.createRoomUsernames = new Set();
    this.roomService.createRoomUsernames.add(this.authService.user.value.username);
    const id = this.authService.user.value.id;
    this.roomService.createRoomUsers.add(id);
    this.friendsList = this.friendsService.friendsSubject.value;
    this.friendsSub = this.friendsService.friendsSubject.subscribe(friends => {
      this.friendsList = friends;
    })
    // this.friendsList = [this.TestDto, this.TestDto, this.TestDto, this.TestDto, this.TestDto, this.TestDto]
  }
  createRoom() {
    if (this.roomService.createRoomUsers.size > 1) {
      let roomName = "";
      for (let roomname of this.roomService.createRoomUsernames.keys()) {
        roomName += roomname + ",";
      }
      roomName = roomName.substring(0, roomName.length - 1);
      const userIds: number[] = [];
      this.roomService.createRoomUsers.forEach(userId => {
        userIds.push(userId);
      });
      const roomDto: RoomDto = { "userIds": userIds, "roomName": roomName }
      this.roomService.createRoom(roomDto).subscribe(status => {
        if (status.success) {
          const newRooms = this.roomService.rooms.getValue().slice();
          newRooms.push(roomDto);
          this.roomService.rooms.next(newRooms);
          this.roomService.closeRoom.next(true);
        }
      })
    }
  }

}
