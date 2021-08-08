import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

import { PatientService } from 'src/app/core/services';
import { PatientFilter, PatientRecord } from 'src/app/shared/models';
import { SnackbarService } from 'src/app/core/utilities';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<PatientRecord>;

  filterForm = this.fb.group({
    patientName: [''],
    phone: ['']
  });

  totalRecordsCount = 2;
  patientFilter?: PatientFilter;
  paginationData = {
    page: 0,
    offset: 0,
    pageSize: 20
  }

  dataSource: PatientRecord[] = [];
  backupDataSource: PatientRecord[] = [];
  displayedColumns: string[] = ['slNo', 'patientName', 'age', 'gender', 'phone', 'createdDate', 'action'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private patientService: PatientService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getPatientList();
  }

  getFilteredData() {
    let filterData = this.filterForm.value as PatientFilter;
    this.dataSource = [...this.backupDataSource];
    if (filterData.patientName) {
      this.dataSource = this.dataSource.filter((data) => {
        return data.patientName.toLowerCase().includes(filterData.patientName.toLowerCase());
      })
    }
    if (filterData.phone) {
      this.dataSource = this.dataSource.filter((data) => {
        return data.phone.toLowerCase().includes(filterData.phone.toLowerCase());
      })
    }
    this.table.renderRows();
  }

  removePatient(index: number) {
    this.dataSource.splice(index, 1);
    this.table.renderRows();
  }

  getPatientList() {
    this.patientService.getPatientsList().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        let patientRecord: PatientRecord = {
          id: doc.id,
          patientAge: data.patientAge,
          patientName: data.patientName,
          phone: data.phone,
          gender: data.gender,
          createdDate: data.createdDate,
          modifiedDate: data.modifiedDate
        }
        this.dataSource.push(patientRecord);
      });
      this.backupDataSource = [...this.dataSource];
      this.table.renderRows();
    }, (err) => {
      this.snackbarService.error(err.message);
    });
  }

  deleteRecord(index: number, element: PatientRecord) {
    this.patientService.deletePatientRecord(element.id as string).then((res) => {
      this.snackbarService.success("Deleted Successfully");
      this.removePatient(index);
    }).catch((err) => {
      this.snackbarService.error("Error on delete");
    })
  }

  viewRecord(id: string) {
    this.router.navigate([`/doctor/new-patient/view`], {
      queryParams: {
        id: id
      }
    });
  }

  editRecord(id: string) {
    this.router.navigate([`/doctor/new-patient/edit`], {
      queryParams: {
        id: id
      }
    });
  }

  resetFilter() {
    this.filterForm.reset();
    this.dataSource = [...this.backupDataSource];
  }

  handlePageEvent(ev: PageEvent) {

  }

}
