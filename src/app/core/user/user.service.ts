import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as jwt_decode from  'jwt-decode';

import { TokenService } from '../token/token.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private userSubject = new BehaviorSubject<User>(null);
  private userName: string;

  constructor(private tokenService: TokenService) { 
    this.tokenService.has() && this.decodeAndNotify();
  }
  
  getUserName(): string {
      return this.userName;
  }

  logout() {
      this.tokenService.remove();
      this.userSubject.next(null);
  }

  set(token: string) {
    this.tokenService.set(token);
    this.decodeAndNotify();
  }

  get() {
    return this.userSubject.asObservable();
  }  

  private decodeAndNotify() {
    const token = this.tokenService.get();
    const user = jwt_decode(token) as User;
    this.userName = user.name;
    this.userSubject.next(user);    
  }

  isLogged() {
    return this.tokenService.has();
  }

}
