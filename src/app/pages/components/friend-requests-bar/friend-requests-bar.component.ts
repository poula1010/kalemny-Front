import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-friend-requests-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './friend-requests-bar.component.html',
  styleUrl: './friend-requests-bar.component.css'
})
export class FriendRequestsBarComponent {

}
