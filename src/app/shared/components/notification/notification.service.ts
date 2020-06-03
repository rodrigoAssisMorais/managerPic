import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification, NotificationType } from './notification';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    notificationSubject: Subject<Notification> = new Subject<Notification>();
    keepAfterRouteChange: boolean = false;

    constructor(router: Router) {
        router.events.subscribe( event => {
            if(event instanceof NavigationStart) {
                if(this.keepAfterRouteChange) {
                    this.keepAfterRouteChange=false;
                } 
                else {
                    this.notificationSubject.next(null);
                }
            }
        })
    };

    success(message: string, keepAfterRouteChange: boolean = false) {
        this.notification(NotificationType.SUCCESS, message, keepAfterRouteChange);
    }

    warning(message: string, keepAfterRouteChange: boolean = false) {
        this.notification(NotificationType.WARNING, message, keepAfterRouteChange);
    }

    danger(message: string, keepAfterRouteChange: boolean = false) {
        this.notification(NotificationType.DANGER, message, keepAfterRouteChange);
    }

    info(message: string, keepAfterRouteChange: boolean = false) {
        this.notification(NotificationType.INFO, message, keepAfterRouteChange);
    }

    private notification(notificationType: NotificationType, message: string, keepAfterRouteChange: boolean){
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.notificationSubject.next(new Notification(notificationType, message));
    }

    getNotification() {
        return this.notificationSubject.asObservable();
    }
}