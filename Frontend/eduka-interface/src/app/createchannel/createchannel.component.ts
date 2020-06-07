import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createchannel',
  templateUrl: './createchannel.component.html',
  styleUrls: ['./createchannel.component.scss']
})
export class CreatechannelComponent implements OnInit {

  constructor() { }
  channelName: string;
  loading = false;
  errorMsg = '';
  ngOnInit(): void {
  }
  createChannel() {
	this.errorMsg = '';

    if (!this.channelName) {
      this.errorMsg = 'Please enter the Room Code';
      return;
    }
  }
}