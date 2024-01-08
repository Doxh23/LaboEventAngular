import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Role} from "../../Models/Role";
import {RoleService} from "../../service/Role/role.service";
import {KeyValuePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    KeyValuePipe,
    NgIf,
    NgForOf,
    NgClass,

  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  registerForm! : FormGroup
  submitted: boolean = false


  constructor(private fs : FormBuilder,private roleService : RoleService,private authS : AuthService, private router : Router) {
    const strongPasswordRegex = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/
    this.registerForm = this.fs.group({

      loginEmail: [null,[Validators.required,Validators.email]],
      password: [null,[Validators.required,Validators.pattern(strongPasswordRegex)]],
      role :[ 4,Validators.required],
      lastName: [null,[Validators.required]],
      firstName: [null,Validators.required],
      gsm: [null,[Validators.required,Validators.pattern("^((\\+32-?)|0)?[0-9]{9}$")]],
      nickName: [null,Validators.required],
      allergie: [null,Validators.required],
      infoSupp: [null,Validators.required],
    })



  }

  geterrors(key : any){
console.log(key)
    switch (key) {
      case "" :
        return "le champ doit etre un email"
    }
    return "";
  }
  onSubmit(){
    // @ts-ignore
    this.submitted = true;
if(this.registerForm.valid){
  console.log(this.registerForm)
  this.authS.register(this.registerForm.value).subscribe({
    next: data => {

      this.router.navigate([""])
    },
    error: (error) => {

    }
  })
}else{
  // @ts-ignore

}
  }
}
