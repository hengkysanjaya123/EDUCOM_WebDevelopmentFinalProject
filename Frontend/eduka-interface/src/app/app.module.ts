import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {ClassroomsComponent} from './classrooms/classrooms.component';
import {RoomComponent} from './room/room.component';
import {SignupComponent} from './signup/signup.component';
import {CreateroomComponent} from './createroom/createroom.component';
import {JoinroomComponent} from './joinroom/joinroom.component';
import {FooterComponent} from './footer/footer.component';
import { CreatechannelComponent } from './createchannel/createchannel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ClassroomsComponent,
    RoomComponent,
    SignupComponent,
    CreateroomComponent,
    JoinroomComponent,
    FooterComponent,
    CreatechannelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
