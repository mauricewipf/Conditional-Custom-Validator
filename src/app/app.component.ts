import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    fullName: ['', Validators.required],
    address: this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required]
    }),
    abweichendeRechnungsadresse: [false],
    invoiceStreet: ['', conditionalCustomValidator('abweichendeRechnungsadresse')],
    invoiceZip: ['', conditionalCustomValidator('abweichendeRechnungsadresse')],
    invoiceCity: ['', conditionalCustomValidator('abweichendeRechnungsadresse')],
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.warn(this.form.value);
  }

  updateCheckbox() {
    this.form.get('invoiceStreet').updateValueAndValidity();
    this.form.get('invoiceZip').updateValueAndValidity();
    this.form.get('invoiceCity').updateValueAndValidity();
  }
}

export function conditionalCustomValidator(conditionalControl: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    try {
      const required = control.parent.controls[conditionalControl].value ? true : false;
      return required ? Validators.required(control) : null;
    } catch (e) {
      return null;
    }
  };
}
