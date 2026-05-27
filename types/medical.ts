import {
  MedicationCategory,
  ExerciseIntensity,
  MealType,
  GlucoseContext,
} from "@/types/medical.enum";

type GlucoseRange = {
  min: number;
  max: number;
};

export type GlucoseRanges = {
  hypoglycemiaThreshold: number;
  normalFasting: GlucoseRange;
  normalPostMeal: GlucoseRange;
  hyperglycemiaThreshold: number;
  unit: "mg/dL";
};

export type PatientData = {
  patientId: string;
  glucoseRecords: GlucoseRecord[];
  mealRecords: MealRecord[];
  exerciseRecords: ExerciseRecord[];
  medicationRecords: MedicationRecord[];
};

export type MedicationRecord = {
  id: string;
  takenAt: Date;
  medicationName: string;
  dosage: string;
  category: MedicationCategory;
  note: string | null;
};

export type ExerciseRecord = {
  id: string;
  startedAt: Date;
  durationMinutes: number;
  intensity: ExerciseIntensity;
  exerciseType: string | null;
  note: string | null;
};

export type MealRecord = {
  id: string;
  consumedAt: Date;
  mealType: MealType;
  carbohydrateGrams: number | null;
  calories: number | null;
  note: string | null;
};

export type GlucoseRecord = {
  id: string;
  measuredAt: Date;
  value: number;
  unit: "mg/dL";
  context: GlucoseContext;
  note: string | null;
};
