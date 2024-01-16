import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { SocketService } from "./socket.service";
import { MessageInterface } from "../interfaces/MessageInterface";

@Injectable({ providedIn: "root" })
export class MessageService {
    messages: MessageInterface[] = [];
    updateMessages = new Subject<MessageInterface[]>();
    constructor() { }
    // sendMessageRequest(message: string) {
    //     this.socketService.sendMessageRequest(message);
    // }

    addMessage(message: MessageInterface) {
        this.messages.push(message);
        this.updateMessages.next(this.messages.slice());
    }
}