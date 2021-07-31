import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { NewPatientComponent } from './patients-list/new-patient/new-patient.component';
import { PatientsListComponent } from './patients-list/patients-list.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorComponent,
    children: [
      {
        path: 'patients-list',
        component: PatientsListComponent
      },
      {
        path: 'new-patient',
        component: NewPatientComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
