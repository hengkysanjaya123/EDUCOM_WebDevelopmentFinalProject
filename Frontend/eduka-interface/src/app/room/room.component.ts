import {Component, OnInit} from '@angular/core';
import {AccountServiceService} from '../../services/AccountService/account-service.service';
import {MessageService} from '../../services/message/message.service';
import {HTTPCustomResponse} from '../../models/response.model';
import {Member} from '../../models/member.model';
import {ChannelService} from '../../services/channel/channel.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomService} from '../../services/room/room.service';
import {Room} from '../../models/room.model';
import {interval} from 'rxjs';

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
  currentSelectedChannel: number = null;
  sub: any;
  loading = false;
  languageCodes = {
    Afrikaans: 'af',
    Albanian: 'sq',
    Amharic: 'am',
    Arabic: 'ar',
    Armenian: 'hy',
    Azerbaijani: 'az',
    Basque: 'eu',
    Belarusian: 'be',
    Bengali: 'bn',
    Bosnian: 'bs',
    Bulgarian: 'bg',
    Catalan: 'ca',
    Cebuano: 'ceb (ISO-639-2)',
    Chinese: 'zh-CN',
    Corsican: 'co',
    Croatian: 'hr',
    Czech: 'cs',
    Danish: 'da',
    Dutch: 'nl',
    English: 'en',
    Esperanto: 'eo',
    Estonian: 'et',
    Finnish: 'fi',
    French: 'fr',
    Frisian: 'fy',
    Galician: 'gl',
    Georgian: 'ka',
    German: 'de',
    Greek: 'el',
    Gujarati: 'gu',
    'Haitian Creole': 'ht',
    Hausa: 'ha',
    Hawaiian: 'haw',
    Hebrew: 'he',
    Hindi: 'hi',
    Hmong: 'hmn',
    Hungarian: 'hu',
    Icelandic: 'is',
    Igbo: 'ig',
    Indonesian: 'id',
    Irish: 'ga',
    Italian: 'it',
    Japanese: 'ja',
    Javanese: 'jv',
    Kannada: 'kn',
    Kazakh: 'kk',
    Khmer: 'km',
    Kinyarwanda: 'rw',
    Korean: 'ko',
    Kurdish: 'ku',
    Kyrgyz: 'ky',
    Lao: 'lo',
    Latin: 'la',
    Latvian: 'lv',
    Lithuanian: 'lt',
    Luxembourgish: 'lb',
    Macedonian: 'mk',
    Malagasy: 'mg',
    Malay: 'ms',
    Malayalam: 'ml',
    Maltese: 'mt',
    Maori: 'mi',
    Marathi: 'mr',
    Mongolian: 'mn',
    'Myanmar (Burmese)': 'my',
    Nepali: 'ne',
    Norwegian: 'no',
    'Nyanja (Chichewa)': 'ny',
    'Odia (Oriya)': 'or',
    Pashto: 'ps',
    Persian: 'fa',
    Polish: 'pl',
    'Portuguese (Portugal, Brazil)': 'pt',
    Punjabi: 'pa',
    Romanian: 'ro',
    Russian: 'ru',
    Samoan: 'sm',
    'Scots Gaelic': 'gd',
    Serbian: 'sr',
    Sesotho: 'st',
    Shona: 'sn',
    Sindhi: 'sd',
    'Sinhala (Sinhalese)': 'si',
    Slovak: 'sk',
    Slovenian: 'sl',
    Somali: 'so',
    Spanish: 'es',
    Sundanese: 'su',
    Swahili: 'sw',
    Swedish: 'sv',
    Tagalog: 'tl',
    Tajik: 'tg',
    Tamil: 'ta',
    Tatar: 'tt',
    Telugu: 'te',
    Thai: 'th',
    Turkish: 'tr',
    Turkmen: 'tk',
    Ukrainian: 'uk',
    Urdu: 'ur',
    Uyghur: 'ug',
    Uzbek: 'uz',
    Vietnamese: 'vi',
    Welsh: 'cy',
    Xhosa: 'xh',
    Yiddish: 'yi',
    Yoruba: 'yo',
    Zulu: 'zu'
  };

  constructor(private api: MessageService, private route: ActivatedRoute, private router: Router, private accountService: AccountServiceService, private channelapi: ChannelService, private roomApi: RoomService) {
  }

  ngOnInit(): void {
    this.accountService.hasAccess();

    this.currentMember = this.accountService.userValue;

    this.currentRoom = this.roomApi.getRoom;
    console.log('room: ' + JSON.stringify(this.currentRoom));
    this.loadChannels();

    interval(1000).subscribe(x => {
      if (this.currentSelectedChannel) {
        console.log('fired');
        this.loadMessage(this.currentSelectedChannel);
      }
    });

  }

  doSomething(item, event) {
    this.loading = true;
    this.loadMessage(item.id);
    this.currentSelectedChannel = item.id;
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

    // translation-english:
    if (text.includes('/translation-')) {
      // tslint:disable-next-line:no-shadowed-variable
      const data = text.split('-');
      const data2 = data[1].split(':');

      let language = data2[0];
      language = language.charAt(0).toUpperCase() + language.slice(1);
      // language.charAt(0).toUpperCase();
      console.log('language', language);
      const message = data2[1];

      const langCode = this.languageCodes[language];
      console.log('langCode',langCode);

      const bodyRequest = {
        message,
        user: currentUser.fullname,
        target_language: langCode
      };
      console.log('body request', bodyRequest);
      this.api.translation(bodyRequest).subscribe(res => {
        item.target.value = res.data;
      }, err => {
        console.log('error: ' + JSON.stringify(err));
      });

      return;
    }

    if (!text) {
      return;
    }

    const data = {
      room_channel_id: this.currentSelectedChannel,
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

  loadMessage(room_channel_id = this.currentSelectedChannel) {
    // const room_channel_id = '1';

    this.api.loadMessage(room_channel_id).subscribe(res => {
      // console.log('result: ' + JSON.stringify(res));
      this.channel_chats = res;
      this.loading = false;
    }, err => {
      // console.log('error: ' + JSON.stringify(err));
      this.channel_chats = null;
      this.loading = false;
    });
  }

  announce(message) {
    alert(JSON.stringify(message));
  }

}
