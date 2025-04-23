import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet],
  template: `
    <p>
      user-layout works!
      <router-outlet />
    </p>
  `,
  styles: ``,
})
export class UserLayoutComponent {}
