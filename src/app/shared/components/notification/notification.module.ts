import { NgModule } from '@angular/core';
import { NotificationComponent } from './notification.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [NotificationComponent],
    exports: [NotificationComponent],
    imports: [CommonModule]
})
export class NotificationModule {

}