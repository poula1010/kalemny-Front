import { Component } from '@angular/core';
import { RoomBarComponent } from '../components/room-bar/room-bar.component';
import { FriendsBarComponent } from '../../testpage/friends-bar/friends-bar.component';
import { FriendRowComponent } from '../../testpage/friends-bar/friend-row/friend-row.component';
import { SearchBarComponent } from '../../testpage/search-bar/search-bar.component';
import { MessageComponent } from '../../testpage/message/message.component';
import { MessageFormComponent } from '../../testpage/message-form/message-form.component';
import { FriendRequestsBarComponent } from '../components/friend-requests-bar/friend-requests-bar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterModule, RoomBarComponent, FriendsBarComponent, FriendRowComponent, SearchBarComponent, MessageComponent, FriendRequestsBarComponent, MessageFormComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
