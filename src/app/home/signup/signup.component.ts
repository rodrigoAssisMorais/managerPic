import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validators';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { SignUpServices } from './signup.services';
import { Router } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { userNamePassword } from './username-password.validator';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [
    UserNotTakenValidatorService
  ]
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>
  

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signUpService: SignUpServices,
    private router: Router,
    private platformDetectorService: PlatformDetectorService) { 

  }

  ngOnInit() {

    this.signupForm = this.formBuilder.group({
      email: ['', 
        [
          Validators.required,
          Validators.email
        ]
      ],
      userName: ['', 
        [
          Validators.required,
          lowerCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(40)
        ],
        this.userNotTakenValidatorService.checkUserNameTaken()
      ],
      fullName: ['', 
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]
      ],
      password: ['', 
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14)
        ]
      ]
    },
    {
      validator: userNamePassword
    })

    // dar focu no input de email
    this.platformDetectorService.isPlatformBrowser && this.emailInput.nativeElement.focus();
  }

  signup() {
    const newUser: NewUser = this.signupForm.getRawValue() as NewUser;
    this.signUpService
        .signUp(newUser)
        .subscribe(
          () => this.router.navigate(['']),
          err => console.log(err)
        );

  }

}
