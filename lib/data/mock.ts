import type { PatientDataDTO } from "@/types/medical.dto";
import {
  exerciseIntensity,
  MedicationCategory,
  GlucoseContext,
  MealType,
} from "@/types/medical.enum";

const MEDICATIONS: {
  name: string;
  category: MedicationCategory;
  dosage: string;
}[] = [
  { name: "메트포르민", category: "oral_hypoglycemic", dosage: "500mg" },
  { name: "인슐린 라피드", category: "insulin", dosage: "10units" },
  { name: "오젬픽", category: "glp1_agonist", dosage: "0.5mg" },
  { name: "아세트아미노펜", category: "other", dosage: "500mg" },
];
const EXERCISE_TYPES = [
  "walk",
  "run",
  "swim",
  "bike",
  "climbing",
  "jumping_rope",
  "squat",
];
type ExerciseType = (typeof EXERCISE_TYPES)[number];

const dailySchedule: Array<{ hour: number; context: GlucoseContext }> = [
  { hour: 7, context: "fasting" },
  { hour: 12, context: "before_meal" },
  { hour: 14, context: "after_meal" },
  { hour: 18, context: "before_meal" },
  { hour: 20, context: "after_meal" },
  { hour: 22, context: "bedtime" },
];
const mealSchedule: Array<{ hour: number; mealType: MealType }> = [
  { hour: 7, mealType: "breakfast" },
  { hour: 12, mealType: "lunch" },
  { hour: 18, mealType: "dinner" },
];
const GLUCOSE_RANGES = {
  fasting: { min: 85, max: 145 },
  before_meal: { min: 90, max: 150 },
  after_meal: { min: 120, max: 220 },
  bedtime: { min: 100, max: 160 },
  random: { min: 90, max: 180 },
} as const satisfies Record<GlucoseContext, { min: number; max: number }>;

const CALORIE_VALUE = { min: 500, max: 1000 } as const;
const CARBOHYDRATE_VALUE = { min: 30, max: 100 } as const;
const DURATION_VALUE = { min: 30, max: 60 } as const;

export function generateMockPatient(
  days: number,
  patientId: string
): PatientDataDTO {
  const today = new Date();

  //반환데이터
  const result: PatientDataDTO = {
    patientId: patientId,
    glucoseRecords: [],
    mealRecords: [],
    exerciseRecords: [],
    medicationRecords: [],
  };

  for (let day = 0; day < days; day++) {
    const date = new Date(today);
    date.setDate(today.getDate() - day);

    for (let i = 0; i < dailySchedule.length; i++) {
      const schedule = dailySchedule[i];
      result.glucoseRecords.push({
        id: crypto.randomUUID(),
        measuredAt: setTime(date, schedule.hour),
        value: randomBetween(
          GLUCOSE_RANGES[schedule.context].min,
          GLUCOSE_RANGES[schedule.context].max
        ),
        unit: "mg/dL",
        context: schedule.context,
        note: Math.random() < 0.1 ? "특이사항 없음" : null,
      });
    }

    for (let i = 0; i < mealSchedule.length; i++) {
      const schedule = mealSchedule[i];
      result.mealRecords.push({
        id: crypto.randomUUID(),
        consumedAt: setTime(date, schedule.hour),
        mealType: schedule.mealType,
        carbohydrateGrams: randomBetween(
          CARBOHYDRATE_VALUE.min,
          CARBOHYDRATE_VALUE.max
        ),
        calories: randomBetween(CALORIE_VALUE.min, CALORIE_VALUE.max),
        note: Math.random() < 0.1 ? "특이사항 없음" : null,
      });
      if (Math.random() < 0.4) {
        result.mealRecords.push({
          id: crypto.randomUUID(),
          consumedAt: setTime(date, schedule.hour + 1),
          mealType: "snack",
          carbohydrateGrams: randomBetween(
            CARBOHYDRATE_VALUE.min,
            CARBOHYDRATE_VALUE.max
          ),
          calories: randomBetween(CALORIE_VALUE.min, CALORIE_VALUE.max),
          note: Math.random() < 0.1 ? "특이사항 없음" : null,
        });
      }
    }

    const exerciseCount = randomBetween(0, 2);
    for (let i = 0; i < exerciseCount; i++) {
      const exerciseHour =
        Math.random() < 0.5 ? randomBetween(6, 8) : randomBetween(18, 20);
      result.exerciseRecords.push({
        id: crypto.randomUUID(),
        startedAt: setTime(date, exerciseHour),
        durationMinutes: randomBetween(DURATION_VALUE.min, DURATION_VALUE.max),
        intensity: randomFrom(exerciseIntensity),
        exerciseType: randomFrom(EXERCISE_TYPES),
        note: Math.random() < 0.1 ? "특이사항 없음" : null,
      });
    }

    const medicationCount = randomBetween(1, 3);
    for (let i = 0; i < medicationCount; i++) {
      const takenHour = randomFrom([7, 12, 18, 22]);
      const medication = randomFrom(MEDICATIONS);
      result.medicationRecords.push({
        id: crypto.randomUUID(),
        takenAt: setTime(date, takenHour),
        medicationName: medication.name,
        dosage: medication.dosage,
        category: medication.category,
        note: Math.random() < 0.1 ? "특이사항 없음" : null,
      });
    }
  }

  result.exerciseRecords.sort((a, b) => a.startedAt.localeCompare(b.startedAt));
  result.glucoseRecords.sort((a, b) =>
    a.measuredAt.localeCompare(b.measuredAt)
  );
  result.mealRecords.sort((a, b) => a.consumedAt.localeCompare(b.consumedAt));
  result.medicationRecords.sort((a, b) => a.takenAt.localeCompare(b.takenAt));

  return result;
}

function randomFrom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function setTime(
  base: Date,
  hour: number,
  minuteRange: { min: number; max: number } = { min: 0, max: 59 }
): string {
  const d = new Date(base);
  d.setHours(hour, randomBetween(minuteRange.min, minuteRange.max), 0, 0);
  return d.toISOString();
}
