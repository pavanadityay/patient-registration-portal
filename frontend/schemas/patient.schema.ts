import { z } from "zod";

export const patientRegistrationSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  birthDate: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other", "unknown"]),
  phone: z.string().min(10, "Phone number is required"),
  email: z.string().email("Valid email is required"),
  address: z.string().min(5, "Address is required"),
  province: z.string().min(1, "Province is required"),
  healthCardNumber: z.string().min(5, "Health card number is required"),
  programType: z.string().min(1, "Program type is required"),
  consent: z.boolean().refine((value) => value === true, {
    message: "Consent is required",
  }),
});

export type PatientRegistrationFormValues = z.infer<
  typeof patientRegistrationSchema
>;