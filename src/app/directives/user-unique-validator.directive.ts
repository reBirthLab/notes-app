import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

@Directive({
  selector: '[userUniqueValid][formControlName],[userUniqueValid][ngModel]',
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: UserUniqueValidatorDirective, multi: true }
  ]
})
export class UserUniqueValidatorDirective implements Validator {

  private userValidateUrl = 'http://localhost:8080/checkUserUnique';

  validate(c: AbstractControl): Promise<{ [key: string]: any; }> {
    const user = c.value;
    let params: HttpParams = new HttpParams();
    params = params.append('user', user);

    return new Promise(resolve =>
      this.http.get(this.userValidateUrl, { params })
        .subscribe(res => {
          res ? resolve(null) : resolve({ userUniqueValid: false });
        })
      );
  }

  registerOnValidatorChange?(fn: () => void): void {
  }

  constructor(private http: HttpClient) { }

}
