import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-account-layout',
  imports: [RouterOutlet],
  template: `
    <p>account-layout works!</p>
    <router-outlet />
  `,
  styles: ``,
})
export class AccountLayoutComponent {}
