import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { RoomComponent } from './room/room.component';
import { ChannelComponent } from './channel/channel.component';


const routes: Routes = [
	{ path: '', component: HomeComponent},
	{ path: 'login', component: LoginComponent},
	{ path: 'classrooms', component: ClassroomsComponent},
	{ path: 'room', component: RoomComponent},
	{ path: 'channel', component: ChannelComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
