import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventsService} from "../../service/event/events.service";

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  event! : any
constructor(private aR : ActivatedRoute,private eS : EventsService) {
let id = aR.snapshot.params["id"]
this.eS.getById(id).subscribe(data => {
  this.event = data
  console.log(data)
})
}
}
