import { Directive } from "@angular/core";
import {
    AbstractControl,
    NG_VALIDATORS,
    ValidationErrors,
    Validator,
    ValidatorFn,
} from "@angular/forms";

import * as CPF from "cpf";

@Directive({
    selector: "[appCpfValidator]",
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: CpfValidationDirective,
            multi: true,
        },
    ],
})
export class CpfValidationDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        return cpfValidator()(control)
    }
}

export function cpfValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const isCpfValid = !CPF.isValid(control.value);
        return isCpfValid ? { cpfInvalid: { value: control.value } } : null;
    };
}
