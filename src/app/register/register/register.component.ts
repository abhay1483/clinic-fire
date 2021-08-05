import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm = this.fb.group({
    username: ['', Validators.required],
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
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  register() {
    let data = {...this.registrationForm.value} as User;
    this.userService.createUser(data).then((res)=> {
      console.log("new user", res);
      
    }, (err) => {
        console.log("error", err);
        
    });
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

}
