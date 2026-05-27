export const medicationCategory = [
  "insulin",
  "oral_hypoglycemic",
  "glp1_agonist",
  "other",
] as const;
export type MedicationCategory = (typeof medicationCategory)[number];

export const exerciseIntensity = ["low", "medium", "high"] as const;
export type ExerciseIntensity = (typeof exerciseIntensity)[number];

export const mealType = ["breakfast", "lunch", "dinner", "snack"] as const;
export type MealType = (typeof mealType)[number];

export const glucoseContext = [
  "fasting",
  "before_meal",
  "after_meal",
  "bedtime",
  "random",
] as const;
export type GlucoseContext = (typeof glucoseContext)[number];
