import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet],
  template: `
    <p>user-layout works!</p>
    <router-outlet />
  `,
  styles: ``,
})
export class UserLayoutComponent {}
