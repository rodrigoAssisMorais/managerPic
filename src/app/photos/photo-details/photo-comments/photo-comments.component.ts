import { Component, OnInit, Input } from '@angular/core';
import { PhotoService } from '../../photo/photo.service';
import { Observable } from 'rxjs';
import { PhotoComment } from '../../photo/photo-comment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, tap} from 'rxjs/operators'

@Component({  
    selector: 'mp-photo-comments',  
    templateUrl: './photo-comments.component.html',
    styleUrls: ['photo-comments.css']
})
export class PhotoCommentsComponent implements OnInit {
    
    comments$: Observable<PhotoComment[]>;
    commentForm: FormGroup;

    @Input() photoId: number;
    constructor (
        private photoService: PhotoService,
        private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.comments$ = this.photoService.getComments(this.photoId);
        this.commentForm = this.formBuilder.group({
            comment: ['', Validators.maxLength(300)]
        })
    }

    save() {
        const comment = this.commentForm.get('comment').value as string;
        this.comments$ = this.photoService
            .addComment(this.photoId, comment)
            .pipe(switchMap(()=> this.photoService.getComments(this.photoId)))
            .pipe(tap(() => 
                {
                    this.commentForm.reset();
                }
            ));
    }
}