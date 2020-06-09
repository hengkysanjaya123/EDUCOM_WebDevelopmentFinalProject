import {Component, OnInit} from '@angular/core';
import {AccountServiceService} from '../../services/AccountService/account-service.service';
import {MessageService} from "../../services/message/message.service";
import {HTTPCustomResponse} from "../../models/response.model";
import {Member} from "../../models/member.model";
import {ChannelService} from '../../services/channel/channel.service';
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../services/room/room.service";
import {Room} from "../../models/room.model";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  channel_chats: HTTPCustomResponse = {
    data: null,
    message: '',
    success: false
  };
  currentMember: Member;
  room_channels: Object;

  currentRoom: Room;

  constructor(private api: MessageService, private route: ActivatedRoute, private router: Router, private accountService: AccountServiceService, private channelapi: ChannelService, private roomApi: RoomService) {
  }

  ngOnInit(): void {
    this.accountService.hasAccess();

    this.currentMember = this.accountService.userValue;

    this.currentRoom = this.roomApi.getRoom;
    console.log('room: ' + JSON.stringify(this.currentRoom));
    this.loadChannels();
  }

  doSomething(item, event) {
    this.loadMessage(item.id);
  }

  logout() {
    this.accountService.logout();
  }

  loadChannels() {
    const room_id = this.roomApi.getRoom.id;
    this.channelapi.getRoomChannels(room_id).subscribe(res => {
      console.log('result: ' + JSON.stringify(res));
      this.room_channels = res;
    }, err => {
      console.log('error: ' + JSON.stringify(err));
      this.room_channels = null;
    });

  }

  sendMessage(item) {
    const text = item.target.value;
    item.target.value = '';
    item.target.placeholder = 'sending message...';
    const currentUser = this.accountService.userValue;

    if (!text) {
      return;
    }

    const data = {
      room_channel_id: 1,
      name: currentUser.fullname,
      message: text
    };

    this.api.sendMessage(data).subscribe(res => {
      console.log('result: ' + JSON.stringify(res));
      this.loadMessage();
      item.target.placeholder = 'type your message here...';
    }, err => {
      console.log('error: ' + JSON.stringify(err));
    });

  }

  loadMessage(room_channel_id = '1') {
    // const room_channel_id = '1';
    this.api.loadMessage(room_channel_id).subscribe(res => {
      console.log('result: ' + JSON.stringify(res));
      this.channel_chats = res;
    }, err => {
      console.log('error: ' + JSON.stringify(err));
      this.channel_chats = null;
    });
  }
}
