import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { PatientRecord } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private router: Router,
    private firestore: AngularFirestore
  ) { 

  }

  getPatientsList() {
    return <Observable<PatientRecord[]>>this.firestore.collection('patient-records').valueChanges();
  }

  storePatientsRecord(data: PatientRecord) {
    this.firestore.collection('patient-records').add(data);
  }
}
