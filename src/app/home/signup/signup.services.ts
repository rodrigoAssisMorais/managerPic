import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class SignUpServices {

    // persistir novo usuário
    signUp(newUser: NewUser) {
        return this.http.post(`${API_URL}/user/signup`, newUser);
    }
    /**
     *
     */
    constructor(private http: HttpClient) { }

    checkUsrNameTaken(userName: string) {
        return this.http.get(`${API_URL}/user/exists/${userName}`);
    }
}