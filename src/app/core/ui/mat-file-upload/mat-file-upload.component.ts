import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

const URL = environment.api.auth.url;

@Component({
      selector: 'mat-file-upload',
      templateUrl: './mat-file-upload.component.html',
      styleUrls: ['./mat-file-upload.component.scss'],
})
export class MatFileUploadComponent implements OnInit {

      uploader: FileUploader = new FileUploader({ url: URL });
      hasBaseDropZoneOver = false;
      hasAnotherDropZoneOver = false;

      ngOnInit(): void {
      }

      public fileOverBase(e: any): void {
            this.hasBaseDropZoneOver = e;
      }

      public fileOverAnother(e: any): void {
            this.hasAnotherDropZoneOver = e;
      }
}