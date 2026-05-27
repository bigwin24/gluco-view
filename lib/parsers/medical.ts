import {
  ExerciseRecord,
  GlucoseRecord,
  MealRecord,
  MedicationRecord,
  PatientData,
} from "@/types/medical";
import {
  ExerciseRecordDTO,
  GlucoseRecordDTO,
  MealRecordDTO,
  MedicationRecordDTO,
  PatientDataDTO,
} from "@/types/medical.dto";

export function parsePatientData(dto: PatientDataDTO): PatientData {
  return {
    patientId: dto.patientId,
    glucoseRecords: dto.glucoseRecords.map(parseGlucoseRecord),
    mealRecords: dto.mealRecords.map(parseMealRecord),
    exerciseRecords: dto.exerciseRecords.map(parseExerciseRecord),
    medicationRecords: dto.medicationRecords.map(parseMedicationRecord),
  };
}

export function parseMedicationRecord(
  record: MedicationRecordDTO
): MedicationRecord {
  return {
    ...record,
    takenAt: new Date(record.takenAt),
  };
}

export function parseExerciseRecord(record: ExerciseRecordDTO): ExerciseRecord {
  return {
    ...record,
    startedAt: new Date(record.startedAt),
  };
}

export function parseMealRecord(record: MealRecordDTO): MealRecord {
  return {
    ...record,
    consumedAt: new Date(record.consumedAt),
  };
}

export function parseGlucoseRecord(record: GlucoseRecordDTO): GlucoseRecord {
  return {
    ...record,
    measuredAt: new Date(record.measuredAt),
  };
}
