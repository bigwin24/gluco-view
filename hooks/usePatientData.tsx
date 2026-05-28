"use client";

import { getPatientInfo } from "@/lib/api/client";
import { ApiError } from "@/lib/api/error";
import { parsePatientData } from "@/lib/parsers/medical";
import { PatientData } from "@/types/medical";
import { useState, useEffect } from "react";

export default function usePatientData({
  patientId,
  days,
}: {
  patientId: string;
  days: number;
}) {
  const [data, setData] = useState<PatientData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController(); // 매번 새로
    let ignore = false;

    async function getPatient() {
      setIsLoading(true);
      setError(null);
      try {
        const dto = await getPatientInfo(
          patientId,
          { days },
          controller.signal
        );
        if (!ignore) setData(parsePatientData(dto));
      } catch (err) {
        if (ignore) return;

        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        // 그 외 모든 에러는 처리
        if (err instanceof ApiError) {
          setError(err);
        } else {
          // 예상 못 한 에러도 사용자에게 알림
          setError(
            new ApiError("INTERNAL_ERROR", "예상치 못한 오류가 발생했습니다", 0)
          );
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    getPatient();

    return () => {
      ignore = true;
      controller.abort();
    }; // 이 effect의 controller를 abort
  }, [patientId, days]);

  return { data, isLoading, error };
}
