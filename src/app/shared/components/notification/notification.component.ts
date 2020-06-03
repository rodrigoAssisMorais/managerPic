import { Component, Input } from '@angular/core';
import { Notification, NotificationType } from './notification'
import { NotificationService } from './notification.service';

@Component({
    selector: 'mp-notification',
    templateUrl: './notification.component.html'
})
export class NotificationComponent {
    @Input() timeout = 3000;
    notifications: Notification[] = [];

    /**
     *
     */
    constructor(private notificationService: NotificationService) {
        this.notificationService
            .getNotification()
            .subscribe(notification => {
                if(!notification) {
                    this.notifications = [];
                    return;
                }

                this.notifications.push(notification);
                setTimeout(() => {
                    this.removeNotification(notification)
                }, this.timeout);
            })
    }

    removeNotification(notificationToDismiss: Notification) {
        this.notifications = this.notifications.filter(notification => notification != notificationToDismiss);
    }

    getNotificationClass(notification: Notification): string {
        if (!notification) return '';
        let notificationType: string = '';
        switch (notification.notificationType) {
            case NotificationType.DANGER:
                notificationType = 'alert alert-danger';                                
                break;
            case NotificationType.INFO:
                notificationType ='alert alert-info';
                break;
            case NotificationType.SUCCESS:
                notificationType ='alert alert-success';
                break;
            case NotificationType.WARNING:
                notificationType ='alert alert-warning';
                break;
            default:
                break;
        }
        return notificationType;
    

    }
}