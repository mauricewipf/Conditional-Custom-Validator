import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Conditional Custom Validator';
  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    fullName: ['', Validators.required],
    address: this.fb.group({
      street: [''],
      city: [''],
      zip: ['']
    }),
    abweichendeRechnungsAdresse: [null],
    invoiceAddress: this.fb.group({
      street: ['', conditionalCustomValidator('abweichendeRechnungsAdresse')],
      city: ['', conditionalCustomValidator('abweichendeRechnungsAdresse')],
      zip: ['', conditionalCustomValidator('abweichendeRechnungsAdresse')]
    }),
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => console.log(this.form));
  }

  onSubmit() {
    console.warn(this.form.value);
  }

}

export function conditionalCustomValidator(conditionalControl: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = false;
    console.log(control.parent, conditionalControl);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}
