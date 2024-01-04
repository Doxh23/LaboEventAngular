import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Role} from "../../Models/Role";
import {RoleService} from "../../service/Role/role.service";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    KeyValuePipe,
    NgIf,
    NgForOf,

  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  registerForm! : FormGroup


  constructor(private fs : FormBuilder,private roleService : RoleService) {
    this.registerForm = this.fs.group({

      loginEmail: [null,[Validators.required,Validators.minLength(5),Validators.email]],
      password: [null,Validators.required],
      role :[ 4,Validators.required],
      lastName: [null,Validators.required],
      firstName: [null,Validators.required],
      gsm: [null,Validators.required],
      nickName: [null,Validators.required],
      allergie: [null,Validators.required],
      infoSupp: [null,Validators.required],
    })



  }
  onSubmit(){
if(this.registerForm.valid){
  console.log(this.registerForm)
}else{
  // @ts-ignore
  console.log(typeof(this.registerForm.get("loginEmail").errors))
}
  }
}
