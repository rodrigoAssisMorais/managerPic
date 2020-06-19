import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { Observable } from 'rxjs';
import { PhotoComment } from '../photo/photo-comment';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
    templateUrl: './photo-details.component.html',             
})

export class PhotoDetailsComponent implements OnInit{
    
    photo$: Observable<Photo>;
    photoId: number;
    
    constructor(
        private route: ActivatedRoute,
        private photoService: PhotoService,
        private router: Router,
        private notificationService: NotificationService,
        private userService: UserService
        ) { }
    
    ngOnInit(): void {
        this.photoId = this.route.snapshot.params.photoId as number;
       
        this.photo$ = this.photoService
            .findById(this.photoId); 

        this.photo$
            .subscribe(
                ()=>{},
                err => {
                    console.log(err);
                    this.router.navigate(['not-found']);
                } )
    }

    remove() {
        this.photoService
            .removePhoto(this.photoId)
            .subscribe(() => {
                this.notificationService.success('Photo removed!', true);
                this.router.navigate(['/user', this.userService.getUserName()]
                , { replaceUrl: true })
            },
            err => {
                console.log(err);
                this.notificationService.warning('Could not delete the photo!');
            });
    }

    like(photo: Photo) {
        this.photoService
            .like(photo.id)
            .subscribe(liked => {
                if(liked) {
                    this.photo$ = this.photoService.findById(photo.id);
                }
            })
    }


}   
