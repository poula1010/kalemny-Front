import { UserDto } from "../testpage/friends-bar/friend-row/friend-row.component";

export interface MessageDto {
    message: String,
    timeStamp: Date,
    userDto: UserDto
}