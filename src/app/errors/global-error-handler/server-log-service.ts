import { HttpClient } from '@angular/common/http';
import { ServerLog } from './server-log';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root'})
export class ServerLogService {
    constructor(private http: HttpClient) {}

    log(serverLog: ServerLog){
        return this.http.post(`${environment.serverLog}/infra/log`, serverLog);
    }
}