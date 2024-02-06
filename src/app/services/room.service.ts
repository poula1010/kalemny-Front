import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { RoomDto } from "../interfaces/RoomDto";
import { SendMessageDto } from "../interfaces/SendMessageDto";
import { MessageDto } from "../interfaces/MessageDto";
import { SuccessOrFailDto } from "../interfaces/SuccessOrFailDto";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class RoomService {
    constructor(private http: HttpClient) {
    }
    refreshRoomSub = new Subject<boolean>();
    ROOM_API_URL = environment.serverUrl + "/api/room";
    MESSAGE_API_URL = this.ROOM_API_URL + "/message"
    room = new BehaviorSubject<number>(null);
    rooms = new BehaviorSubject<RoomDto[]>(null);
    closeRoom = new Subject<boolean>();
    createRoomUsers: Set<number> = null;
    createRoomUsernames: Set<string> = null;
    getRooms() {
        return this.http.get<RoomDto[]>(this.ROOM_API_URL);
    }
    createRoom(roomDto: RoomDto) {
        return this.http.post<SuccessOrFailDto>(this.ROOM_API_URL, roomDto);
    }

    deleteRoom(roomId: number) {
        return this.http.delete<SuccessOrFailDto>(this.ROOM_API_URL, {
            params: {
                roomId: roomId
            }
        })
    }
    joinRoom(roomId: number) {
        this.room.next(roomId);

    }
    exitRoom() {
        this.room.next(null);
    }
    sendMessage(sendMessageDto: SendMessageDto) {
        return this.http.post<SuccessOrFailDto>(this.MESSAGE_API_URL, sendMessageDto);
    }
    getMessages(roomId: number) {
        return this.http.get<MessageDto[]>(this.MESSAGE_API_URL, { params: { roomId: roomId } })
    }
}