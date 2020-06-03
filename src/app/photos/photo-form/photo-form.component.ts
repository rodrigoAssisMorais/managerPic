import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from '../photo/photo.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private notificationService: NotificationService,
    private userService: UserService) { }
  file: File;
  preview: string = '';

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
        description: ['', 
        [ 
          Validators.required,
          Validators.maxLength(300)
        ] 
      ],
      allowComments: [true]
    })
  }

  upload() {
    const description : string = this.photoForm.get('description').value;
    const allowComments: boolean = this.photoForm.get('allowComments').value;
    console.log('component.upload');
    this.photoService.upload(description, allowComments, this.file)
      .subscribe(() => {
          this.notificationService.success('Upload complete', true);
          this.router.navigate(['/user', this.userService.getUserName()]);
      }) 
  }
  
  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }
}