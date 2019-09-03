import { NgModule } from '@angular/core';

import { AutoFocusDirective } from './auto-focus.directive';
import { FileUploadInputFor } from './file-upload-input-for.directive';

@NgModule({
    declarations: [
        AutoFocusDirective,
        FileUploadInputFor
    ],
    imports     : [
    ],
    exports     : [
        AutoFocusDirective,
        FileUploadInputFor
    ],
    entryComponents: [
    ]
})
export class DirectivesModule {
}
