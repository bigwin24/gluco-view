import PatientInfo from "@/features/main/PatientInfo";

export default async function Page() {
  const patientId = crypto.randomUUID();
  return (
    <div className="flex min-h-svh p-6">
      <PatientInfo patientId={patientId} />
    </div>
  );
}
