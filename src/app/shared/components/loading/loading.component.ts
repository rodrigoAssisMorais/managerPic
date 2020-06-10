import { OnInit, Component } from '@angular/core';
import { LoadingType } from './loading.type';
import { Observable } from 'rxjs';
import { LoadingService } from './loading.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'mp-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
    loading$: Observable<string>;
    
    constructor(private loadingService: LoadingService) {}
    
    ngOnInit(): void {
        this.loading$ = this.loadingService
            .getLoanding()
            .pipe(map(loadingType => loadingType.valueOf()));
    }
}