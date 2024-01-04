import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../Models/Role";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  RegisterForm! : FormGroup
  listRole! : Role ;

  constructor(private fs : FormBuilder) {
    this.RegisterForm = this.fs.group({

      loginEmail: [Validators.required],
      password: [Validators.required],
      role :[Validators.required],
      lastName: [Validators.required],
      firstName: [Validators.required],
      gsm: [Validators.required],
      nickName: [Validators.required],
      allergie: [Validators.required],
      infoSupp: [Validators.required]
    })
  }
}
