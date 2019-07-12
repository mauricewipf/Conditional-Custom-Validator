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
    this.form.valueChanges.subscribe(() => console.log());
  }

  onSubmit() {
    console.warn(this.form.value);
  }

}

export function conditionalCustomValidator(conditionalControl: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    try {
      const required = (control.parent && control.parent.controls[conditionalControl] && control.parent.controls[conditionalControl].value) ? true : false;
      return required ? Validators.required : null;
    } catch (e) {
      return null;
    }
  };
}
