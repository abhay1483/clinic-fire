import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

export interface PatientDetails {
  patientName: string;
  age: number;
  gender: string;
}

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<PatientDetails>;

  filterForm = this.fb.group({
    patientName: [''],
    phone: ['']
  });

  totalRecordsCount = 2;

  dataSource: PatientDetails[] = [];
  displayedColumns: string[] = ['slNo', 'patientName', 'age', 'gender', 'action'];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.dataSource = [{
      patientName: "Nidhin Nochad",
      age: 28,
      gender: "Male"
    },
    {
      patientName: "Abhay",
      age: 25,
      gender: "Male"
    }]
  }

  removePatient(index: number) {
    this.dataSource.splice(index, 1);
    this.table.renderRows();
  }

  getPatientList() {

  }

  resetFilter() {
    this.filterForm.reset();
  }

  handlePageEvent(ev: PageEvent) {

  }

}
