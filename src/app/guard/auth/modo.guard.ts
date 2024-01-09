import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../service/auth/auth.service";

export const modoGuard: CanActivateFn = (route, state) => {
  let auth =  inject(AuthService)
  console.log(auth.isConnectedBehavior.value)
  return auth.isConnectedBehavior.value?.role == "Admin" || auth.isConnectedBehavior.value?.role == "Modo" ? true : false
};
