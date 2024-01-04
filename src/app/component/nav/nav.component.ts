import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

auth! : AuthService
  constructor(private aS : AuthService) {
  this.auth = aS
  }

  disconnect(){
    this.aS.disconnect()
  }
}
