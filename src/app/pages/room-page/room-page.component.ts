import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageComponent } from '../../testpage/message/message.component';
import { MessageFormComponent } from '../../testpage/message-form/message-form.component';
import { MessageService } from '../../services/messages.service';
import { MessageInterface } from '../../interfaces/MessageInterface';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RoomService } from '../../services/room.service';
import { MessageDto } from '../../interfaces/MessageDto';
import { Socket } from 'socket.io';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-room-page',
  standalone: true,
  imports: [MessageComponent, MessageFormComponent, CommonModule],
  templateUrl: './room-page.component.html',
  styleUrl: './room-page.component.css'
})
export class RoomPageComponent implements OnInit, OnDestroy {
  constructor(private roomService: RoomService, private socketService: SocketService) { }
  refreshRoomSub: Subscription;
  ngOnInit(): void {
    this.refreshRoomSub = this.roomService.refreshRoomSub.subscribe(bool => {
      if (bool) {
        this.roomService.getMessages(this.roomId).subscribe(messages => {
          this.messages = messages;
        })
      }
    })
    this.messages = [];
    this.roomId = this.roomService.room.value;
    this.socketService.joinRoom(this.roomId);
    this.roomService.getMessages(this.roomId).subscribe(messages => {
      this.messages = messages;
    })
  }

  ngOnDestroy(): void {
    this.roomService.room.next(null);
    this.refreshRoomSub.unsubscribe();
  }

  imgUrl1 = "assets/unnamed.png";
  messages: MessageDto[];

  roomId: number;

}
