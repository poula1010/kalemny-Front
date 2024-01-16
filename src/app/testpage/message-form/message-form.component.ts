import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from '../../services/messages.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-message-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './message-form.component.html',
  styleUrl: './message-form.component.css'
})
export class MessageFormComponent {
  messageForm: FormGroup;
  constructor(private messageService: MessageService, private socketService: SocketService) { }
  ngOnInit(): void {
    this.messageForm = new FormGroup({ 'message': new FormControl("", [Validators.required]) })
  }
  onSubmit() {
    if (this.messageForm.valid) {
      this.socketService.sendMessageRequest({ message: this.messageForm.value.message, name: "test", timeStamp: new Date() });
      this.messageForm.reset();
    }
  }
}
