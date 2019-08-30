import { Injectable } from '@angular/core';
import { MatStepper } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormService } from 'src/app/core/services/form.service';

/**
 * Service extension of `FormService`.
 *
 * Used for manage a `MatStepper` with `FormBuilder`
 * This is a custom Service and totally optionnal but is a good help
 */
@Injectable()
export class FormStepperService extends FormService {
    private stepper: MatStepper;

    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    /**
     * Set link between a FormGroup and a MatStepper
     * @param id is form and stepper id
     * @param form is form form to link with stepper
     * @param stepper is stepper to link with form
     */
    setForm(id: string, form: FormGroup[], stepper: MatStepper) {
        this.set(id, form);
        this.stepper = stepper;
        this.move(this.step);

        this.setSelectionChange();
    }

    /**
     * Go to next step and save the step
     */
    next() {
        this.stepper.next();
        this.step = this.stepper.selectedIndex;
        this.saveForm();
    }

    /**
     * Go to previous step and save the step
     */
    previous() {
        this.stepper.previous();
        this.step = this.stepper.selectedIndex;
        this.saveForm();
    }

    /**
     * Go to required step and save the step
     */
    move(step: number) {
        this.step = this.stepper.selectedIndex = step;
        this.saveForm();
    }

    /**
     * If stepper is linear, permit to pass previous steps already valid
     * and prevent some bugs.
     *
     * To use it, you need to call in `AfterViewInit` lifecycle hook through `ngAfterViewInit`
     * and force change detection with `ChangeDetectorRef` through `this.cdr.detectChanges()`
     * to prevent error messages
     */
    setPreviousStepsTouched() {
        if (this.stepper.linear) {
            Object.entries(this.stepper._steps.toArray()).forEach(
                ([key, step]) => {
                    if (parseInt(key, 10) < this.step) {
                        step.interacted = true;
                        step.stepControl.markAllAsTouched();
                    }
                }
            );
        }
    }

    private setSelectionChange() {
        this.stepper.selectionChange.subscribe(x => {
            this.step = x.selectedIndex;
            this.saveForm();
        });
    }


}
