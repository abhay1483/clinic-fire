import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  defaultOptions: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }
  constructor(
    private snackBar: MatSnackBar
  ) {

  }

  default(message: string) {
    this.snackBar.open(message, undefined, this.defaultOptions);
  }

  error(message: string) {
    this.snackBar.open(message, undefined, {
      ...this.defaultOptions,
      panelClass: 'error-snack'
    });
  }

  success(message: string) {
    this.snackBar.open(message, undefined, {
      ...this.defaultOptions,
      panelClass: 'success-snack'
    });
  }
}
