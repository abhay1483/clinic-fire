import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    patientAge: [undefined, Validators.required],
    gender: ['', Validators.required],
    diagnosis: [''],
    medicine: ['']
  });

  genderList = Gender;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  resetForms() {

  }

  addNewRecord() {

  }

}
