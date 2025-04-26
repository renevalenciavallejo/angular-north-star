import { ErrorHandler, Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  transloco = inject(TranslocoService);

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        alert(this.transloco.translate('error.noInternet'));
        return;
      }
      switch (error.status) {
        case 401:
          alert(this.transloco.translate('error.401'));
          break;
        case 403:
          alert(this.transloco.translate('error.403'));
          break;
        case 400:
          if (
            error.error &&
            error.error.validationErrors &&
            Object.keys(error.error.validationErrors).length > 0
          ) {
            return;
          }
          if (error.error && error.error.message) {
            alert(error.error.message);
          } else {
            alert(this.transloco.translate('error.400'));
          }
          break;
        case 404:
          alert(this.transloco.translate('error.404'));
          break;
        case 500:
          alert(this.transloco.translate('error.500'));
          break;
        default:
          alert(this.transloco.translate('error.default'));
          break;
      }
    } else {
      alert(this.transloco.translate('error.default'));
    }
  }
}
