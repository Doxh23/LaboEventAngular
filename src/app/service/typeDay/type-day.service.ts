import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Role} from "../../Models/Role";
import {TypeDay} from "../../Models/TypeDay";

@Injectable({
  providedIn: 'root'
})
export class TypeDayService {

  constructor(private http : HttpClient) {


  }

  getAll(): Observable<TypeDay[]>{

    return this.http.get<TypeDay[]>("https://localhost:7213/api/EventType")

  }
}
