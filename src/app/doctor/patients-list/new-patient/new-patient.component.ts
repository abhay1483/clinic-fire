import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/core/services';
import { SnackbarService } from 'src/app/core/utilities';
import { PatientRecord } from 'src/app/shared/models';

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHERS = "Others"
}

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent implements OnInit {

  patientForm = this.fb.group({
    patientName: ['', Validators.required],
    patientAge: ['', Validators.required],
    gender: ['', Validators.required],
    phone: ['', Validators.required],
    diagnosis: [''],
    medicine: ['']
  });

  genderList = Gender;
  patientId?: string;
  action: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.action = params["action"];
      this.patientId = params["id"];
      if (this.action && this.action != 'add') {
        this.getRecordById(this.patientId as string);
      }
    })
  }

  resetForms() {
    this.patientForm.reset();
  }

  updateRecord() {
    let data = { ...this.patientForm.value };
    this.patientService.updatePatientRecord(data).then((res) => {
      this.snackbarService.success('Patient record updated');
    }).catch((err) => {
      this.snackbarService.error('Patient record updation failed');
    });
  }

  getRecordById(id: string) {
    this.patientService.getPatientRecordById(id).subscribe((doc) => {
      if (doc.exists) {
        let data = doc.data() as PatientRecord;
        this.patientForm.patchValue({
          patientName: data.patientName,
          patientAge: data.patientAge,
          gender: data.gender,
          phone: data.phone,
          diagnosis: data.diagnosis,
          medicine: data.medicine
        });
      } else {
        this.snackbarService.error('No record found');
      }
    }, (err) => {
      this.snackbarService.error('Error fetching record');
    });
  }

  addNewRecord() {
    let data = { ...this.patientForm.value };
    this.patientService.storePatientsRecord(data).then((res) => {
      this.snackbarService.success('Patient record added');
    }).catch((err) => {
      this.snackbarService.error('Patient record submission failed');
    })
  }

}
