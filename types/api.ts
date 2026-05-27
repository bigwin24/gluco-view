type ErrorCode = "INVALID_PARAMETER" | "PATIENT_NOT_FOUND" | "INTERNAL_ERROR";

export type CommonError = {
  error: ErrorCode;
  message: string;
  field?: string;
};
