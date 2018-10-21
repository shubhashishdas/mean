import { Component, OnInit } from '@angular/core';
import { ConfigService } from './services/config.service';
import { AuthService } from './common/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mean-course';
  isLoading: boolean;

  constructor(
    private authService: AuthService
  ) {
    this.isLoading = false;
  }

  ngOnInit() {
    this.authService.checkOnPageLoad();
  }
}
