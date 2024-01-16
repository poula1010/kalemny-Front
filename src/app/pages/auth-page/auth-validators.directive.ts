import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function MustMatch(controlName: string, matchingControlName: string) {
    return (group: AbstractControl) => {
        const control = group.get(controlName);
        const matchingControl = group.get(matchingControlName);
        if (control.value !== matchingControl.value) {
            return { unmatchedPasswords: true };
        }
        return null;
    }
}
