import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AddEventForm} from "../../Models/AddEventForm";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http : HttpClient) { }

  getAllCommentByEvent(id : number): Observable<any>{

    return this.http.get<any>(`https://localhost:7213/api/Comments/event/${id}`)

  }
  addComment(data : Comment): Observable<any>{

    return this.http.post<any>(`'https://localhost:7213/api/Comments`,data)

  }
  AddEvent(data : AddEventForm): Observable<number>{

    return this.http.post<number>("https://localhost:7213/api/Event",data)

  }

  addDays(id : number,date : Date, typeId : number){

    return this.http.post<number>("https://localhost:7213/api/EventTypeDay",{type : {id : typeId },eventId : id , date : date })
  }
  getDays(id : number){
    return this.http.get<any>(`https://localhost:7213/api/EventTypeDay/getByEvent/${id}`)
  }
}
