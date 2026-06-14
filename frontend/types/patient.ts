export type Gender = "male" | "female" | "other" | "unknown";

export type ProgramType =
  | "Public Health Enrollment"
  | "Primary Care"
  | "Chronic Disease Program"
  | "Virtual Care"
  | "Claims Support";

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: string;
  phone: string;
  email: string;
  province: string;
  healthCardNumber: string;
  programType: ProgramType;
  registeredDate: string;
}