import { Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {EventsComponent} from "./component/events/events.component";
import {EventComponent} from "./component/event/event.component";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {AddEventComponent} from "./component/add-event/add-event.component";

export const routes: Routes = [
  {path: "", component : HomeComponent},
  {path : "Events",component : EventsComponent},
  {path : "Login",component : LoginComponent},
  {path : "Register", component : RegisterComponent},
  {path : "Events/1", component : EventComponent },
  {path : "Events/1/1", component : EventComponent },
  {path : "Events/new",component : AddEventComponent}
      ];
//TODO A CHANGER LE PATH EVENT/1/1 EN EVENT/ID/JOUR
