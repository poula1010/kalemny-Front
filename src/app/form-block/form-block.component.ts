import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from '../services/messages.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-form-block',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-block.component.html',
  styleUrl: './form-block.component.css'
})
export class FormBlockComponent implements OnInit {
  messageForm: FormGroup;
  constructor(private messageService: MessageService, private socketService: SocketService) { }
  ngOnInit(): void {
    this.messageForm = new FormGroup({ 'message': new FormControl("", [Validators.required]) })
  }
  onSubmit() {
    // this.socketService.sendMessage(this.messageForm.value.message);
  }
}
