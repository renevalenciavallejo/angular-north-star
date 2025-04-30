import { ErrorHandler, Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  private translate = inject(TranslateService);

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        console.log(this.getMessage('error.noInternet'));
        return;
      }
      switch (error.status) {
        case 401:
          console.log(this.getMessage('error.401'));
          break;
        case 403:
          console.log(this.getMessage('error.403'));
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
            console.log(error.error.message);
          } else {
            console.log(this.getMessage('error.400'));
          }
          break;
        case 404:
          console.log(this.getMessage('error.404'));
          break;
        case 500:
          console.log(this.getMessage('error.500'));
          break;
        default:
          console.log(this.getMessage('error.default'));
          break;
      }
    } else {
      console.error(error);
      console.log(this.getMessage('error.default'));
    }
  }

  private getMessage(key: string) {
    let message: string = '';
    if (!key) return message;

    this.translate.get(key).subscribe((res) => {
      message = res;
    });

    return message;
  }
}
