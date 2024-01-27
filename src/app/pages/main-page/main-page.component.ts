import { Component, OnInit } from '@angular/core';
import { RoomBarComponent } from '../components/room-bar/room-bar.component';
import { FriendsBarComponent } from '../../testpage/friends-bar/friends-bar.component';
import { FriendRowComponent, UserDto } from '../../testpage/friends-bar/friend-row/friend-row.component';
import { SearchBarComponent } from '../../testpage/search-bar/search-bar.component';
import { MessageComponent } from '../../testpage/message/message.component';
import { MessageFormComponent } from '../../testpage/message-form/message-form.component';
import { FriendRequestsBarComponent } from '../components/friend-requests-bar/friend-requests-bar.component';
import { RouterModule } from '@angular/router';
import { FriendsService } from '../../services/friends.service';
import { FriendPageComponent } from '../friend-page/friend-page.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterModule, RoomBarComponent, FriendsBarComponent, FriendRowComponent, SearchBarComponent, MessageComponent, FriendRequestsBarComponent, MessageFormComponent, FriendPageComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {
  constructor(private friendsService: FriendsService) { }

  ngOnInit(): void {
    this.friendsService.getFriends().subscribe((response: UserDto[]) => {
      const friends: UserDto[] = [];
      for (let friend of response) {
        friends.push(friend)
      }

      this.friendsService.friendsSubject.next(friends);
    })
  }

}
