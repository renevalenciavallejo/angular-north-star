import { ApiValidationErrors } from './api-validation-error.model';

export interface ApiResult<T> {
  success: boolean;
  message: string;
  details: string;
  code: string;
  validationErrors: ApiValidationErrors;
  data: T;
}
