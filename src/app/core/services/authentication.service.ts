import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';

import { Observable } from 'rxjs';
import { SnackbarService } from '../utilities';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: Observable<firebase.User | null>;

  constructor(
    private router: Router,
    private snackbar: SnackbarService,
    private angularFireAuth: AngularFireAuth
  ) {
    this.userData = angularFireAuth.authState;
  }

  signUp(email: string, password: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.snackbar.success('Register successful. \n To sign in verify your e-mail through link sent to your inbox');
        console.log("reg res", res);
        res.user?.sendEmailVerification();
      })
      .catch(err => {
        this.snackbar.error(err.message);
        console.log("reg err", err);
      });
  }

  signIn(credentials: any) {
    this.angularFireAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(res => {
        res.user?.emailVerified ? this.snackbar.success('Login Successful') : this.snackbar.error('Verify your e-mail address to sign in');
      })
      .catch(err => {
        this.snackbar.error(err.message);
      });
  }

  setAuthData() {

  }

  purgeAuth() {

  }

  logout() {

  }

  roleBasedRoute() {
    this.router.navigate(['/login']);
  }
}
