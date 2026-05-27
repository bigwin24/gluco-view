// app/api/v1/patients/[patientId]/route.ts
import { generateMockPatient } from "@/lib/data/mock";
import { errorResponse } from "@/lib/api/error";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ patientId: string }> }
) {
  const { patientId } = await params;
  console.log("api호출 patientId: ", patientId);
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!patientId || patientId.trim() === "") {
    return errorResponse(
      "INVALID_PARAMETER",
      "환자 ID가 필요합니다",
      400,
      "patientId"
    );
  }

  if (patientId === "0000") {
    return errorResponse(
      "PATIENT_NOT_FOUND",
      `환자 ID ${patientId}를 찾을 수 없습니다`,
      404
    );
  }

  const random = Math.random();
  console.log("random값:", random);

  if (random < 0.1) {
    return errorResponse(
      "INTERNAL_ERROR",
      "서버에서 일시적 오류가 발생했습니다",
      500
    );
  }

  console.log("→ 성공 분기");

  const data = generateMockPatient(30, patientId);
  return Response.json(data);
}
