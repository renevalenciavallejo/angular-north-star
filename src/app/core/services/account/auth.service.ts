import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from '../../models/account/login.dto';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenticationResultDto } from '../../models/account/authentication-result.dto';
import { environment } from '../../../../environments/environment';
import { ApiResult } from '../../../shared/models/api-result.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private _isAuthenticated = false;

  constructor() {
    if (this.isBrowser) {
      this._isAuthenticated = !!localStorage.getItem('token');
    }
  }

  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  login(login: LoginDto): Observable<AuthenticationResultDto> {
    return this.http
      .post<ApiResult<AuthenticationResultDto>>(
        `${environment.apiUrl}/account/login`,
        login
      )
      .pipe(
        tap((res) => {
          if (res.success && this.isBrowser) {
            localStorage.setItem('token', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            this._isAuthenticated = true;
          }
        }),
        map((res) => {
          return res.data;
        })
      );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      this._isAuthenticated = false;
    }
  }
}
