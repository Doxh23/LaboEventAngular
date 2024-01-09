import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {NavComponent} from "./component/nav/nav.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./service/auth/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements  OnInit{
  title = 'laboEventAngular';
constructor(private aS: AuthService) {
}
  ngOnInit(): void {

    if(localStorage.getItem("user") !== ""){
      // @ts-ignore

      this.aS.isConnectedBehavior.next(JSON.parse(localStorage.getItem("user")))
    }else{
      this.aS.isConnectedBehavior.next(null)
    }
  }
}
