import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private router: Router
  ) { 

  }

  roleBasedRoute() {
    this.router.navigate(['/login']);
  }
}
