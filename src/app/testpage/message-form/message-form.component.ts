import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from '../../services/messages.service';
import { SocketService } from '../../services/socket.service';
import { RoomService } from '../../services/room.service';
import { MessageDto } from '../../interfaces/MessageDto';
import { AuthService } from '../../services/auth.service';
import { UserDto } from '../friends-bar/friend-row/friend-row.component';
import { SendMessageDto } from '../../interfaces/SendMessageDto';

@Component({
  selector: 'app-message-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './message-form.component.html',
  styleUrl: './message-form.component.css'
})
export class MessageFormComponent {
  messageForm: FormGroup;
  roomId: number;
  constructor(private roomService: RoomService, private authService: AuthService, private socketService: SocketService) { }
  ngOnInit(): void {
    this.messageForm = new FormGroup({ 'message': new FormControl("", [Validators.required]) })
    this.roomId = this.roomService.room.value;
  }
  onSubmit() {
    if (this.messageForm.valid) {

      const message = this.messageForm.get("message").value;
      const messageDto: SendMessageDto = {
        "message": message,
        "roomId": this.roomId
      };

      this.roomService.sendMessage(messageDto).subscribe(response => {
        if (response.success) {
          this.socketService.refreshRoom(this.roomId);
          this.messageForm.reset();
        }
      });

    }
  }
}
