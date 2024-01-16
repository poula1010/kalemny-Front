import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageComponent } from './message/message.component';
import { CommonModule } from '@angular/common';
import { MessageFormComponent } from './message-form/message-form.component';
import { Subscription } from 'rxjs';
import { MessageService } from '../services/messages.service';
import { MessageInterface } from '../interfaces/MessageInterface';
import { FriendsBarComponent } from './friends-bar/friends-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  selector: 'app-testpage',
  standalone: true,
  imports: [RouterModule, MessageComponent, CommonModule, MessageFormComponent, FriendsBarComponent, SearchBarComponent],
  templateUrl: './testpage.component.html',
  styleUrl: './testpage.component.css'
})
export class TestpageComponent implements OnInit, OnDestroy {
  constructor(private messagesService: MessageService) { }

  ngOnInit(): void {
    this.messageSub = this.messagesService.updateMessages.subscribe(messages => {
      this.messagesDto = messages;
    })
  }

  ngOnDestroy(): void {
    this.messageSub.unsubscribe();
  }

  imgUrl1 = "assets/unnamed.png";
  messagesDto: MessageInterface[];
  messageSub: Subscription;

}
