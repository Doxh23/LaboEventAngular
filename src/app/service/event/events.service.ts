import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Role} from "../../Models/Role";
import {AddEventForm} from "../../Models/AddEventForm";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http : HttpClient) { }



  getAll(): Observable<Event[]>{

    return this.http.get<Event[]>("https://localhost:7213/api/Event")

  }
  getById(id:number): Observable<any>{

    return this.http.get<any>(`https://localhost:7213/api/Event/${id}`)

  }
  AddEvent(data : AddEventForm): Observable<number>{

    return this.http.post<number>("https://localhost:7213/api/Event",data)

  }

  addDays(id : number,date : Date, typeId : number){

  return this.http.post<number>("https://localhost:7213/api/EventTypeDay",{type : {id : typeId },eventId : id , date : date })
}
}
