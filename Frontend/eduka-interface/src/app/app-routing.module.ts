import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { RoomComponent } from './room/room.component';
import { SignupComponent } from './signup/signup.component';
import { CreateroomComponent } from './createroom/createroom.component';
import { JoinroomComponent } from './joinroom/joinroom.component';
import { CreatechannelComponent } from './createchannel/createchannel.component';

const routes: Routes = [
	{ path: '', component: HomeComponent},
	{ path: 'login', component: LoginComponent},
	{ path: 'classrooms', component: ClassroomsComponent},
	{ path: 'room', component: RoomComponent},
	{ path: 'signup', component: SignupComponent},
	{ path: 'createroom', component: CreateroomComponent},
	{ path: 'joinroom', component: JoinroomComponent},	
	{ path: 'createchannel', component: CreatechannelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
