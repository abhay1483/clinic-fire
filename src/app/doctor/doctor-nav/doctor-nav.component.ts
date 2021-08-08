import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'app-doctor-nav',
  templateUrl: './doctor-nav.component.html',
  styleUrls: ['./doctor-nav.component.scss']
})
export class DoctorNavComponent implements OnInit {

  currentUser?: User;

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
    })
  }

  logout() {
    this.authService.logout()
  }

}
