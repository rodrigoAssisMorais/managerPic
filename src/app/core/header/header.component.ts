import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Component({
    selector: 'mp-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent { 

    user$: Observable<User>;
   
    constructor(
        private userService: UserService,
        private router: Router)
    {
        this.user$ = this.userService.get();
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['']);
    }
}