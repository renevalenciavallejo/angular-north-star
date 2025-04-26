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
import { AuthService } from '../../core/services/account/auth.service';
import { FormValidationService } from '../../core/services/error-handler/form-validation.service';

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
  private readonly authService = inject(AuthService);
  private readonly formValidationService = inject(FormValidationService);
  loginForm!: FormGroup;

  constructor() {
    this.buildForm();
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (result) => {
          console.log('Login result:', result);
        },
        error: (error) => {
          this.formValidationService.showFormValidationErrors(
            this.loginForm,
            error
          );
        },
      });
    }
  }

  private buildForm(): void {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      },
      { updateOn: 'blur' }
    );
  }
}
