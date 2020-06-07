import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../../services/channel/channel.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-createchannel',
  templateUrl: './createchannel.component.html',
  styleUrls: ['./createchannel.component.scss']
})
export class CreatechannelComponent implements OnInit {

  constructor(private api: ChannelService, private router: Router,) { }
  channelName: string;
  visibility: string;
  loading = false;
  errorMsg = '';
  ngOnInit(): void {
  }

  //TODO: Change room id to 
  createChannel() {
	this.errorMsg = '';

    if (!this.channelName || ! this.visibility) {
      this.errorMsg = 'Please fill in all the fields';
      return;
    }
    const data = {
      room_id: 1,
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

	      this.router.navigate(['\classrooms', {message: 'Channel created!'}]);
	    }, err => {
	      this.loading = false;
	      console.log('error: ' + JSON.stringify(err));
    });
  }
}