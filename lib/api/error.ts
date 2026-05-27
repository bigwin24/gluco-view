import type { CommonError } from "@/types/api";

export function errorResponse(
  error: CommonError["error"],
  message: string,
  status: number,
  field?: string
) {
  const body: CommonError = { error, message, ...(field && { field }) };
  return Response.json(body, { status });
}
