import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    
    constructor(private tokenService: TokenService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(this.tokenService.has()) {

            const token: string = this.tokenService.get(); 
            req = req.clone({
                setHeaders: {
                    'x-access-token': token
                }
            });
        }
        return next.handle(req);
    }
}