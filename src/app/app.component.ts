import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TextBlockComponent } from './text-block/text-block.component';
import { FormBlockComponent } from './form-block/form-block.component';
import { SocketService } from './services/socket.service';
import { TestpageComponent } from './testpage/testpage.component';
import { environment } from '../environments/environment.development';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TextBlockComponent, FormBlockComponent, TestpageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';
  socket: any;
  messages: string[] = [];

  constructor(private socketService: SocketService, private authService: AuthService) { }
  ngOnInit(): void {
    this.socket = this.socketService.getSocket();
    this.authService.autologin();
    
  }

}
