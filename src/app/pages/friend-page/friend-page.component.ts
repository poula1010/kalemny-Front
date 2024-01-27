import { Component } from '@angular/core';
import { FriendRequestsBarComponent } from '../components/friend-requests-bar/friend-requests-bar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-friend-page',
  standalone: true,
  imports: [FriendRequestsBarComponent, RouterModule],
  templateUrl: './friend-page.component.html',
  styleUrl: './friend-page.component.css'
})
export class FriendPageComponent {

}
