import { Component, Input, OnInit } from '@angular/core';
export interface UserDto {
  username: string,
  id: number,
  image: string,
  email: string
}
@Component({
  selector: 'app-friend-row',
  standalone: true,
  imports: [],
  templateUrl: './friend-row.component.html',
  styleUrl: './friend-row.component.css'
})
export class FriendRowComponent implements OnInit {
  ngOnInit(): void {
    this.imageSrc = "/assets/" + this.user.image;
  }
  @Input()
  user: UserDto;

  imageSrc: string;
}
