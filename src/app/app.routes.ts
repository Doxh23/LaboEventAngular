import { Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {EventsComponent} from "./component/events/events.component";
import {EventComponent} from "./component/event/event.component";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {AddEventComponent} from "./component/add-event/add-event.component";
import {authGuard} from "./guard/auth/auth.guard";
import {modoGuard} from "./guard/auth/modo.guard";
import {notConnectedGuard} from "./guard/auth/not-connected.guard";

export const routes: Routes = [
  {path: "", component : HomeComponent},
  {path : "Events",component : EventsComponent},
  {path : "Login" , canActivate : [notConnectedGuard], component : LoginComponent},
  {path : "Register", canActivate: [notConnectedGuard],  component : RegisterComponent},
  {path : "Events/new",canActivate: [modoGuard] , component : AddEventComponent},
  {path : "Events/:id", component : EventComponent },
  {path : "Events/:id/:day", component : EventComponent },

      ];
//TODO A CHANGER LE PATH EVENT/1/1 EN EVENT/ID/JOUR
