import type { CommonError } from "@/types/api";

export function errorResponse(
  error: CommonError["error"],
  message: string,
  status: number,
  field?: string
): Response {
  const body: CommonError = { error, message, ...(field && { field }) };
  return Response.json(body, { status });
}

export class ApiError extends Error {
  status: number;
  error: CommonError["error"];
  field?: string;

  constructor(
    error: CommonError["error"],
    message: string,
    status: number,
    field?: string
  ) {
    super(message);
    this.error = error;
    this.status = status;
    this.field = field;
  }
}
