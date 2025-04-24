import { Component, inject } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    CommonModule,
    TranslocoDirective,
  ],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  loginForm!: FormGroup;

  constructor() {
    this.buildForm();
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
      // Here you would typically call your authentication service
    }
  }

  private buildForm(): void {
    this.loginForm = this.fb.group(
      {
        email: [
          '',
          [Validators.required, Validators.maxLength(64), Validators.email],
        ],
        password: ['', [Validators.required]],
      },
      { updateOn: 'blur' }
    );
  }
}
