export interface Result<T> {
  result?: T;
  error?: string | Error;
  errorStatus?: ErrorStatus;
  isSuccess: boolean;
}

export function success<T>(result: T): Result<T> {
  return {
    result,
    isSuccess: true,
  };
}

export function failure<T>(error: string | Error, errorStatus: ErrorStatus = "internal-server-error"): Result<T> {
  return {
    error,
    errorStatus,
    isSuccess: false,
  };
}

export function fromDbResult<T>(result: T, error: Error): Result<T> {
  return error ? failure(error, 'db-error') : success(result);
}

export type ErrorStatus =
  "db-error" | "not-found" | "unauthorized" | "forbidden" | "bad-request" | "conflict" | "internal-server-error";