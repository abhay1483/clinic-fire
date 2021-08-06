import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private router: Router,
    private firestore: AngularFirestore
  ) {

  }

  createUser(data: any) {
    return this.firestore.collection('users').add(data);
  }

  getUserByUsername(username: string) {
    //return this.firestore.collection('users').doc()

  }
}
