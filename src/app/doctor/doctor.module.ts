import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { DoctorNavComponent } from './doctor-nav/doctor-nav.component';
import { NewPatientComponent } from './patients-list/new-patient/new-patient.component';


@NgModule({
  declarations: [
    DoctorComponent,
    PatientsListComponent,
    DoctorNavComponent,
    NewPatientComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule
  ]
})
export class DoctorModule { }
