import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}]
})
export class EmailValidatorDirective {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    // TODO écrire la règle de validation
    // En cas de règle respecté (value commence par http), retourner null
    // Sinon retourner l'objet { urlInvalide : true }
    if (control && control.value) {
      // && control.value.indexOf('@') > -1) {
      return null;
    }else{
      return { urlInvalide : true }
    }


  }

}
