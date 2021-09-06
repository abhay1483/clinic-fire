import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from 'src/app/core/services';
import { Credential } from 'src/app/shared/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  passwordConfig = {
    type: 'password',
    hide: true
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  register() {
    let data = {...this.registrationForm.value} as Credential;
    this.authenticationService.signUp(data.email, data.password);
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

}
