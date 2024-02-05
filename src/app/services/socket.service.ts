import { Injectable, OnInit } from "@angular/core";
import { Socket, io } from "socket.io-client";
import { MessageService } from "./messages.service";
import { MessageInterface } from "../interfaces/MessageInterface";
import { environment } from "../../environments/environment.development";
import { RoomService } from "./room.service";

@Injectable({ providedIn: "root" })
export class SocketService {
    private socket: Socket;

    constructor(private messageService: MessageService, private roomService: RoomService) {
        if (!this.socket) {
            this.socket = io(environment.sockerServer);
            this.socket.on("server-to-client", message => {
                this.messageService.addMessage(message);
            })
            this.socket.on("refresh", () => {
                console.log("got refresh")
                this.roomService.refreshRoomSub.next(true);
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
    joinRoom(roomId: number) {
        // const roomIdToString = roomId.toString();
        this.roomService.joinRoom(roomId);
        this.socket.emit('join', roomId);
        this.socket.on("refresh", () => {
            console.log('Room Refreshed')
        })
    }
    leaveRoom(roomId: number) {

        this.socket.emit('leave', roomId);
    }

    refreshRoom(roomId: number) {
        this.socket.emit("refresh", roomId);
    }
}
