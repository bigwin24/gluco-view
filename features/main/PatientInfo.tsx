"use client";

import { Button } from "@/components/ui/button";
import usePatientData from "@/hooks/usePatientData";
import { ApiError } from "@/lib/api/error";
import { useState } from "react";
import PatientChart from "./PatientChart";

const DAY_OPTIONS = [7, 30, 90] as const;

export default function PatientInfo({ patientId }: { patientId: string }) {
  const [days, setDays] = useState<(typeof DAY_OPTIONS)[number]>(30);
  const { data, isLoading, error } = usePatientData({ patientId, days });

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (error) {
    if (error instanceof ApiError) {
      return (
        <div>
          {`[${error.status} ${error.error}]`}
          <br />
          {error.message}
        </div>
      );
    } else {
      return <div>{error.message}</div>;
    }
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div>
        {DAY_OPTIONS.map((d) => (
          <Button
            key={d}
            variant={days === d ? "default" : "ghost"}
            onClick={() => {
              setDays(d);
            }}
          >
            {`${d}일`}
          </Button>
        ))}
      </div>
      <p>환자ID:{data.patientId}</p>

      <PatientChart data={data.glucoseRecords} />
    </div>
  );
}
