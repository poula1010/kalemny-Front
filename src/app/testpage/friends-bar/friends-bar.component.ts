import { Component, OnDestroy, OnInit } from '@angular/core';
import { FriendRowComponent, UserDto } from './friend-row/friend-row.component';
import { FriendsService } from '../../services/friends.service';
import { CommonModule } from '@angular/common';
import { Subscription, take, tap } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FriendDmSelectComponent } from '../../pages/components/add-to-dm/friend-dm-select/friend-dm-select.component';
import { AddToDmComponent } from '../../pages/components/add-to-dm/add-to-dm.component';
import { RoomService } from '../../services/room.service';
import { RoomDto } from '../../interfaces/RoomDto';
import { RoomRowComponent } from '../../pages/components/room-row/room-row.component';

@Component({
  selector: 'app-friends-bar',
  standalone: true,
  imports: [RoomRowComponent, CommonModule, RouterModule, AddToDmComponent],
  templateUrl: './friends-bar.component.html',
  styleUrl: './friends-bar.component.css'
})
export class FriendsBarComponent implements OnInit, OnDestroy {
  showAddDm = false;
  showDmBlock = false;
  constructor(private friendsService: FriendsService, private roomService: RoomService) { }
  closeSubscription: Subscription;
  roomsSubscription: Subscription;
  ngOnDestroy(): void {

    this.closeSubscription.unsubscribe();
    this.roomsSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.rooms = [];
    this.roomsSubscription = this.roomService.rooms.subscribe(rooms => {
      this.rooms = rooms;
    })
    this.roomService.getRooms().subscribe(rooms => {

      this.roomService.rooms.next(rooms);
    })

    this.closeSubscription = this.roomService.closeRoom.subscribe(close => {
      this.showDmBlock = !close;
    })
  }
  toggleDmBlock(): void {
    this.showDmBlock = !this.showDmBlock;
  }

  rooms: RoomDto[];
}
