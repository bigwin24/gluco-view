import {
  MedicationCategory,
  ExerciseIntensity,
  MealType,
  GlucoseContext,
} from "@/types/medical.enum";

export type PatientDataDTO = {
  patientId: string;
  glucoseRecords: GlucoseRecordDTO[];
  mealRecords: MealRecordDTO[];
  exerciseRecords: ExerciseRecordDTO[];
  medicationRecords: MedicationRecordDTO[];
};

export type MedicationRecordDTO = {
  id: string;
  takenAt: string;
  medicationName: string;
  dosage: string;
  category: MedicationCategory;
  note: string | null;
};

export type ExerciseRecordDTO = {
  id: string;
  startedAt: string;
  durationMinutes: number;
  intensity: ExerciseIntensity;
  exerciseType: string | null;
  note: string | null;
};

export type MealRecordDTO = {
  id: string;
  consumedAt: string;
  mealType: MealType;
  carbohydrateGrams: number | null;
  calories: number | null;
  note: string | null;
};

export type GlucoseRecordDTO = {
  id: string;
  measuredAt: string;
  value: number;
  unit: "mg/dL";
  context: GlucoseContext;
  note: string | null;
};
