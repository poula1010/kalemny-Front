import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class MessageService {
    messages = [];
    updateMessages = new Subject<string[]>();

    addMessage(message: string) {
        this.messages.push(message);
        this.updateMessages.next(this.messages.slice());
    }
}