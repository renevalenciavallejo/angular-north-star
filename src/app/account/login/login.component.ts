import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/account/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { FormValidationService } from '../../core/services/error-handler/form-validation.service';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    CommonModule,
    TranslatePipe,
  ],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly formValidationService = inject(FormValidationService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  loginForm!: FormGroup;
  returnUrl: string = '/';

  constructor() {
    this.buildForm();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'] || '/';
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (result) => {
          this.router.navigate(['/']);
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
