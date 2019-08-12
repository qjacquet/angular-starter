import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AlertService {

    constructor(private snackBar: MatSnackBar) { }

    show(message: string, action?: string) {
        this.snackBar.open(
            message,
            action,
            {
                duration: 5000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
            });
    }
}
