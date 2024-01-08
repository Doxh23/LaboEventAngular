import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Role} from "../../Models/Role";
import {Status} from "../../Models/Status";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http : HttpClient) {


  }
  getAll(): Observable<Status[]>{

    return this.http.get<Status[]>("https://localhost:7213/api/Status")

  }
}
