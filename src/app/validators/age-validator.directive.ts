import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appAgeValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: AgeValidatorDirective, multi: true}]

})
export class AgeValidatorDirective {

  constructor() { }

  /**
    * Cette méthode permet de valider qu'une variable a bien la forme d'un age correct
    * C'est à dire que l'age est supérieur à 18 ans
    */
   validate(control: AbstractControl): ValidationErrors | null {

    if (control && control.value && parseInt(control.value) > 17) {
      return null;
    }else{
      return { urlInvalide : true }
    }


  }

}
