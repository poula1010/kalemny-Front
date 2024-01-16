import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../services/messages.service';
import { CommonModule } from '@angular/common';
import { MessageInterface } from '../interfaces/MessageInterface';

@Component({
  selector: 'app-text-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-block.component.html',
  styleUrl: './text-block.component.css'
})
export class TextBlockComponent implements OnInit {
  ngOnInit(): void {
    this.messageSubscription = this.messageService.updateMessages.subscribe((newMessages) => {
      this.messages = newMessages;
    });
  }
  constructor(private messageService: MessageService) { }
  messages: MessageInterface[] = [];
  messageSubscription: Subscription;
}
