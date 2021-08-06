import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm =  this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  passwordConfig = {
    type: 'password',
    hide: true
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    
  }

  login() {
    this.authenticationService.signIn(this.loginForm.value);
    // this.router.navigate(['/doctor/patients-list']);
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }

}
