import { PatientDataDTO } from "@/types/medical.dto";
import { ApiError } from "./error";
import { CommonError } from "@/types/api";

export async function getPatientInfo(
  patientId: string,
  options?: { days?: number },
  signal?: AbortSignal
): Promise<PatientDataDTO> {
  const params = new URLSearchParams();
  if (options?.days) params.set("days", String(options.days));

  const response = await fetch(`/api/v1/patients/${patientId}?${params}`, {
    signal,
  });

  if (!response.ok) {
    const res: CommonError = await response.json();
    throw new ApiError(res.error, res.message, response.status, res.field);
  }

  return await response.json();
}
