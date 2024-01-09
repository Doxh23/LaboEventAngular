import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {registerForm} from "../../Models/RegisterForm";
import {ConnectedUser} from "../../Models/connectedUser";

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  http! : HttpClient
  token = "";

  // @ts-ignore
  isConnectedBehavior : BehaviorSubject<null | ConnectedUser> = new BehaviorSubject<ConnectedUser | null>( )
  IsConnected$ : Observable<ConnectedUser |null> = this.isConnectedBehavior.asObservable()
  constructor(private httpclient : HttpClient) {
    // @ts-ignore


    this.http = httpclient
    console.log("test")

  }


   login(loginForm: { email: string, password: string }): Observable<any> {

    return this.http.post<any>("https://localhost:7213/api/User/Login", loginForm)

// @ts-ignore


  }
  register(registerForm: any): Observable<registerForm> {

    return this.http.post<registerForm>("https://localhost:7213/api/User/register", registerForm)

// @ts-ignore


  }
  getUserById(id:number){
    return this.http.get<any>(`https://localhost:7213/api/User/${id}`)
  }

  disconnect(){
     this.token = "";
  }


  }





