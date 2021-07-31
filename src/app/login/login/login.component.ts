import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm =  this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  passwordConfig = {
    type: 'password',
    hide: true
  }

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  login() {
    this.router.navigate(['/doctor/patients-list']);
  }

}
