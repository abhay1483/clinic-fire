import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import firebase from 'firebase/app';

import { BehaviorSubject } from 'rxjs';

import { SnackbarService } from 'src/app/core/utilities';
import { User } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject = new BehaviorSubject({} as User);
  currentUser = this.currentUserSubject.asObservable();
  private isAuthenticatedSubject = new BehaviorSubject(false);
  isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private router: Router,
    private snackbar: SnackbarService,
    private angularFireAuth: AngularFireAuth,
    private angularFireStore: AngularFirestore
  ) {
    
  }

  populate() {
    this.angularFireAuth.authState.subscribe((user) => {
      if(user?.emailVerified) {
        this.setAuthData(user);
        this.router.navigate(['/doctor/patients-list']);
      }
      else {
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  sendVerificationEmail(res: firebase.auth.UserCredential) {
    res.user?.sendEmailVerification().then((res) => {
      this.snackbar.success('Verfication email sent');
      this.logout();
    });
  }

  signUp(email: string, password: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.snackbar.success('Register successful');
        this.sendVerificationEmail(res);
      })
      .catch(err => {
        this.snackbar.error(err.message);
      });
  }

  signIn(credentials: any) {
    this.angularFireAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(res => {
        if (!res.user?.emailVerified) {
          this.snackbar.error('Verify your e-mail address to sign in');
          this.updateUserData(res.user);
        }
        else if (res.user?.emailVerified) {
          this.snackbar.success('Login Successful');
          this.setAuthData(res.user);
          this.router.navigate(['/doctor/patients-list']);
        }
      })
      .catch(err => {
        this.snackbar.error(err.message);
      });
  }

  private updateUserData(user: any) {
    const userRef = this.angularFireStore.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: false
    }
    userRef.set(data, { merge: true }).then((res) => {
      this.logout();
    }).catch((err) => {
      this.snackbar.error(err.message);
    });
  }

  setAuthData(user: firebase.User) {
    let userData: User = {
      uid: user.uid,
      email: user.email || 'NA',
      displayName: user.email?.split('@')[0],
      emailVerified: user.emailVerified
    }
    this.currentUserSubject.next(userData);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  logout() {
    this.angularFireAuth.signOut().then((res) => {
      this.purgeAuth();
      this.router.navigate(['/login']);
      this.snackbar.success('Logged Out');
    }).catch((err) => {
      this.snackbar.error('Logout Failed');
    });
  }
  
}
