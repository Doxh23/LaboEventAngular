import { Component } from '@angular/core';
import {Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

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
       this.authService.login(this.formgrp.value).subscribe({
         next : data => {
            this.authService.token = data;
            this.router.navigate([""])
         },
         error : (error) => {
           console.log(error.error)
         }
       })

    }


  }
}
