import { Injectable, OnInit } from "@angular/core";
import { Socket, io } from "socket.io-client";
import { MessageService } from "./messages.service";
import { MessageInterface } from "../interfaces/MessageInterface";
import { environment } from "../../environments/environment.development";

@Injectable({ providedIn: "root" })
export class SocketService {
    private socket: Socket;

    constructor(private messageService: MessageService) {
        if (!this.socket) {
            this.socket = io("http://34.76.214.207:3000");
            this.socket.on("server-to-client", message => {
                this.messageService.addMessage(message);
            })
        }
    }

    public getSocket() {
        return this.socket;
    }
    sendMessageRequest(message: MessageInterface) {
        this.socket.emit("client-to-server", message);
    }
    sendMessage(message: string) {
        this.socket.emit("message-sent", message)
    }

}
