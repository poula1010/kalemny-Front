import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageInterface } from '../../interfaces/MessageInterface';
import { MessageDto } from '../../interfaces/MessageDto';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit {
  ngOnInit(): void {
    this.Pics = ["assets/atef2.jpg", "assets/omNazer.jpg"]
    let random = Math.round(Math.random());
    this.imageUrl = this.Pics[random];
  }
  Pics: string[];
  imageUrl: string;
  @Input()
  message: MessageDto;
}
