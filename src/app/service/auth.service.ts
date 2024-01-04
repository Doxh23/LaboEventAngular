import { Injectable } from '@angular/core';
import {Observable, observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http! : HttpClient
  token = "";
  constructor(private httpclient : HttpClient) {
    this.http = httpclient
  }
   httpOptions ={
    headers: new HttpHeaders({
    })
  };

   login(loginForm: { email: string, password: string }): Observable<string> {

    return this.http.post<string>("https://localhost:7213/api/User/Login", loginForm, this.httpOptions)

// @ts-ignore


  }

  disconnect(){
     this.token = "";
  }

  }





