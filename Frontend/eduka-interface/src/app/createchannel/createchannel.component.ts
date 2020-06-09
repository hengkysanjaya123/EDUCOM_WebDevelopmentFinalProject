import {Component, OnInit} from '@angular/core';
import {ChannelService} from '../../services/channel/channel.service';
import {Router} from "@angular/router";
import {RoomService} from "../../services/room/room.service";

@Component({
  selector: 'app-createchannel',
  templateUrl: './createchannel.component.html',
  styleUrls: ['./createchannel.component.scss']
})
export class CreatechannelComponent implements OnInit {

  constructor(private api: ChannelService, private router: Router, private roomApi: RoomService) {
  }

  channelName: string;
  visibility: string;
  loading = false;
  errorMsg = '';

  ngOnInit(): void {
  }

  createChannel() {
    this.errorMsg = '';

    if (!this.channelName || !this.visibility) {
      this.errorMsg = 'Please fill in all the fields';
      return;
    }

    const data = {
      room_id: this.roomApi.getRoom.id,
      channel_name: this.channelName,
      visibility: this.visibility
    };
    this.loading = true;
    this.api.createChannel(data).subscribe(res => {
      this.loading = false;
      console.log('success: ' + JSON.stringify(res));
      if (!res.success) {
        this.errorMsg = res.message;
        return;
      }

      this.router.navigate(['/room']);
    }, err => {
      this.loading = false;
      console.log('error: ' + JSON.stringify(err));
    });
  }
}
