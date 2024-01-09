import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../service/auth/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
 let auth =  inject(AuthService)
   return auth.isConnectedBehavior.value ? true : false

};
