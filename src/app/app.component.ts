import { Component, OnInit } from '@angular/core';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mean-course';
  isLoading: boolean;

  constructor(
    private configService: ConfigService
  ) {
    this.isLoading = false;
  }

  ngOnInit() {
    this.configService.isLoading.subscribe((result: boolean) => {
      this.isLoading = result;
    })
  }
}
