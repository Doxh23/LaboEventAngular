import { Component } from '@angular/core';
import {Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {json} from "node:stream/consumers";
import {ConnectedUser} from "../../Models/connectedUser";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  formgrp! : FormGroup ;
  authService! : AuthService ;

  constructor(private _fb : FormBuilder,private _authService : AuthService,private router : Router) {
    this.formgrp = this._fb.group({
      email : [null,Validators.required],
      password : [null, Validators.required]
    })
    this.authService = _authService;
  }

    onSubmit(): void {
    console.log("In Submit");
    if (this.formgrp.valid) {
       // @ts-ignore
      this.authService.login<any>(this.formgrp.value).subscribe({
         next : (data: { token: string; })  => {
            this.authService.token = data.token;
            // @ts-ignore
           let decodedToken : any = jwtDecode(data.token)
           console.log(decodedToken)
           localStorage.setItem("user",JSON.stringify({


             token : data.token ,
             id : decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"],
             role : decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
           }))
           // @ts-ignore

           this.authService.isConnectedBehavior.next(JSON.parse(localStorage.getItem<ConnectedUser>("user")))


             this.router.navigate([""])
         },
         error : (error: { error: any; }) => {
           console.log(error.error)
         }
       })

    }


  }
}
