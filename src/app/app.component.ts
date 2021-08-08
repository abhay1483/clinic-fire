import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { AuthenticationService } from './core/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Clinic Fire';

  constructor(
    private titleService: Title,
    private authenticationService: AuthenticationService
  ) {

  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.authenticationService.populate();
  }
  
}
