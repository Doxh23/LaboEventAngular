import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {EventsService} from "../../service/event/events.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {

  events : any
  constructor(private eS : EventsService) {
    this.eS.getAll().subscribe({
      next : data =>{
        this.events = data;
        console.log(data)
      },
      error : error => {
        console.log(error.message)
      }
    });
  }

  protected readonly Date = Date;
}
