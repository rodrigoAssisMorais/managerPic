import { Component, Input } from "@angular/core";

import { environment } from '../../../environments/environment'

const CLOUD = environment.apiUrl;

@Component({

    selector: 'mp-photo',
    templateUrl: './photo.component.html'
})
export class PhotoComponent {

    _url : string = '';

    @Input() description = "";
    
    @Input() set url(url : string) {
        if (!url.startsWith('data')){
            this._url = `${CLOUD}/imgs/${url}`; 
        }
        else {
            this._url = url;    
        }
    } 
    get url() {
        return this._url;
    }  
}