import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {EventsService} from "../../service/event/events.service";
import {NgForOf, NgIf} from "@angular/common";
import {CommentsService} from "../../service/comments/comments.service";

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  event! : any
  id : number
constructor(private aR : ActivatedRoute,private eS : EventsService,private router : Router,private cs : CommentsService) {
this.id = aR.snapshot.params["id"]
this.eS.getById(this.id).subscribe({
  next : data => {
    this.event = data
  this.eS.getDays(data.id).subscribe({
    next : data => {
      this.event.days = data;
      console.log(data)
    },
    error: err => {
      console.log(err)
    }
  })
this.cs.getAllCommentByEvent(data.id).subscribe({
  next : data => {
    this.event.comments = data;
    console.log(data)
  },
  error: err => {
    console.log(err)
  }
})

  },
  error : err => {
    router.navigate([""])
  }
})
}
}
