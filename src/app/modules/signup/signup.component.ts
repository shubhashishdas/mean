import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../common/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSignup(signupForm) {
    console.log(signupForm);
    if (signupForm.valid) {
      this.authService.signup(signupForm.value).subscribe(
        (response: any) => {
          if (response.isSuccess) {
            this.router.navigate(['/sign-in']);
            console.log('Successfully signup');
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log('Final call');
        }
      );
    }
  }

}
