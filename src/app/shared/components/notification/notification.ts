export enum NotificationType {
    SUCCESS,
    WARNING,
    DANGER,
    INFO
}

export class Notification {
    constructor (
        public readonly notificationType: NotificationType,
        public readonly message: string 
    ) { }
 
}