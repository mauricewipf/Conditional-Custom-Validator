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
    under18: [false],
    erziehungsberechtigter: ['', conditionalCustomValidator('under18')],
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => console.log(this.form));
  }

  onSubmit() {
    console.warn(this.form.value);
  }

  validate() {
    this.form.updateValueAndValidity();
  }
}

export function conditionalCustomValidator(conditionalControl: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    try {
      const required = (control.parent && control.parent.controls[conditionalControl] &&
        control.parent.controls[conditionalControl].value) ? true : false;
      console.log(required);
      return required ? Validators.required : null;
    } catch (e) {
      return null;
    }
  };
}
