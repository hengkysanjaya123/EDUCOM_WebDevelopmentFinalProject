import {Component, OnInit} from '@angular/core';
import {AccountServiceService} from '../../services/AccountService/account-service.service';
import {MessageService} from "../../services/message/message.service";
import {HTTPCustomResponse} from "../../models/response.model";
import { ChannelService } from '../../services/channel/channel.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  channel_chats: HTTPCustomResponse;
  room_channels: Object;

  constructor(private api: MessageService, private accountService: AccountServiceService, private channelapi: ChannelService) {
  }

  ngOnInit(): void {
    this.accountService.hasAccess();

    this.loadMessage();
    this.loadChannels();
  }

  doSomething() {
    alert('test');
  }

  logout() {
    this.accountService.logout();
  }

  loadChannels() {
    const room_channel_id = '1';
    this.channelapi.getRoomChannels(room_channel_id).subscribe(res => {
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
      item.target.placeholder = '';
    }, err => {
      console.log('error: ' + JSON.stringify(err));
    });

  }

  loadMessage() {
    const room_channel_id = '1';
    this.api.loadMessage(room_channel_id).subscribe(res => {
      console.log('result: ' + JSON.stringify(res));
      this.channel_chats = res;
    }, err => {
      console.log('error: ' + JSON.stringify(err));
      this.channel_chats = null;
    });
  }
}
