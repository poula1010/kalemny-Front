import { Component, Input, OnInit } from '@angular/core';
import { RoomDto } from '../../../interfaces/RoomDto';
import { RoomService } from '../../../services/room.service';
import { Route, Router } from '@angular/router';
import { HelperService } from '../../../services/helper.service';

@Component({
  selector: 'app-room-row',
  standalone: true,
  imports: [],
  templateUrl: './room-row.component.html',
  styleUrl: './room-row.component.css'
})
export class RoomRowComponent implements OnInit {
  constructor(private roomService: RoomService, private router: Router, private helperService: HelperService) { }
  ngOnInit(): void {
    this.imageSrc = "/assets/room.png";
  }
  @Input()
  room: RoomDto;

  imageSrc: string;

  loadRoom() {


    this.router.navigate(["/"]).then(() => {
      this.roomService.joinRoom(this.room.roomId);
      this.router.navigate(["/room"]);
    });
  }
}
