import { Component, OnInit } from '@angular/core';
import { FriendRowComponent } from './friend-row/friend-row.component';
import { FriendsService } from '../../services/friends.service';
import { CommonModule } from '@angular/common';
interface Friend {
  username: string,
  email: string,
  id: number
  image: string,
}
@Component({
  selector: 'app-friends-bar',
  standalone: true,
  imports: [FriendRowComponent, CommonModule],
  templateUrl: './friends-bar.component.html',
  styleUrl: './friends-bar.component.css'
})
export class FriendsBarComponent implements OnInit {
  constructor(private friendsService: FriendsService) { }

  ngOnInit(): void {
    this.friends = [];
    this.friendsService.getFriends().subscribe((response: Friend[]) => {
      for (let friend of response) {
        this.friends.push(friend)
      }
    })
  }
  friends: Friend[];
}
