import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import 'firebase/firestore';

import { PatientFilter, PatientRecord } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private router: Router,
    private firestore: AngularFirestore
  ) { 

  }

  // params: PatientFilter
  getPatientsList() {
    // , (ref) => {
    //   let query: any = ref;
    //   if (params.patientName) { query = query.where('patientName', '==', params.patientName) };
    //   if (params.phone) { query = query.where('phone', '==', params.phone) };
    //   return query;
    // }
    // let recordsRef = this.firestore.collection('patient-records');
    // if (params.patientName) {
    //   recordsRef = this.firestore.collection('patient-records')
    // }
    // <Observable<PatientRecord[]>>
    return this.firestore.collection<PatientRecord>('patient-records').get();
  }

  storePatientsRecord(data: PatientRecord) {
    return this.firestore.collection('patient-records').add(data);
  }

  updatePatientRecord(data: PatientRecord) {
    return this.firestore.collection('patient-records').doc('').update(data);
  }

  getPatientRecordById(id: string) {
    return this.firestore.collection('patient-records').doc(id).get();
  }

  deletePatientRecord(id: string) {
    return this.firestore.collection('patient-records').doc(id).delete();
  }
}
