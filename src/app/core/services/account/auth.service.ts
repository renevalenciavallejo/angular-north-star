import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from '../../models/account/login.dto';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenticationResultDto } from '../../models/account/authentication-result.dto';
import { environment } from '../../../../environments/environment';
import { ApiResult } from '../../../shared/models/api-result.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  login(login: LoginDto): Observable<AuthenticationResultDto> {
    return this.http
      .post<ApiResult<AuthenticationResultDto>>(
        `${environment.apiUrl}/account/login`,
        login
      )
      .pipe(
        tap((res) => {
          if (res.success) {
            localStorage.setItem('token', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
          }
        }),
        map((res) => {
          return res.data;
        })
      );
  }
}
