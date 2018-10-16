import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/auth/auth.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {
    }

    onSignin(signinForm) {
        if (signinForm.valid) {
            this.authService.singin(signinForm.value);
        }
    }

}
