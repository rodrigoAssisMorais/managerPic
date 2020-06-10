import { Component } from '@angular/core';
import { sharedStylesheetJitUrl } from '@angular/compiler';

@Component({
    selector: 'mp-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
    
})
export class MenuComponent {

    isShown: boolean = false;

    toggle() : void {
        this.isShown = !this.isShown;
    }
}