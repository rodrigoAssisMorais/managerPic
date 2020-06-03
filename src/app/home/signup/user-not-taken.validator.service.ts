import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { SignUpServices } from './signup.services';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';

@Injectable()
export class UserNotTakenValidatorService {

    constructor(private signUpService: SignUpServices) { }
    checkUserNameTaken() {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(userName =>
                    this.signUpService.checkUsrNameTaken(userName)
                ))
                .pipe(map(isTaken => isTaken ? {userNameTaken: true } : null))
                .pipe(first());
        }
    }
}