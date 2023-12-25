import { Injectable, OnInit } from "@angular/core";
import { Socket, io } from "socket.io-client";
import { MessageService } from "./messages.service";

@Injectable({ providedIn: "root" })
export class SocketService {
    private socket: Socket;

    constructor(private messageService: MessageService) {
        if (!this.socket) {
            this.socket = io('http://localhost:3000/');
            this.socket.on("recieve-message", message => {
                this.messageService.addMessage(message);
            })
        }
    }

    public getSocket() {
        return this.socket;
    }

    sendMessage(message: string) {
        this.socket.emit("message-sent", message)
    }

}
