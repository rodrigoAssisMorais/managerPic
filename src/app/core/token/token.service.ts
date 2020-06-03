import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  has() {
    const resultado: boolean = !!this.get();
    return resultado;
  }

  set(token: string) {
    window.localStorage.setItem(KEY, token)
  }

  get() : string {
    const token: string = window.localStorage.getItem(KEY); 
    return token;
  }

  remove() {
    window.localStorage.removeItem(KEY);
  }
}
