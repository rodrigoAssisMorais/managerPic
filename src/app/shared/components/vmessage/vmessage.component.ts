import { Component, Input } from '@angular/core';

@Component({
    selector: 'mp-vmessage',
    templateUrl: './vmessage.component.html'
})
export class VMessageComponent { 
    @Input() text: string = '';
}