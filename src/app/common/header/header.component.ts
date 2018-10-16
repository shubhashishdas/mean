import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    isAuthenticate: boolean;

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.authService.isAuthentiacate().subscribe((response) => {
            this.isAuthenticate = response;
        });
    }

    logout() {
        this.authService.logout();
    }
}