"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  patientRegistrationSchema,
  type PatientRegistrationFormValues,
} from "@/schemas/patient.schema";
import { FhirPreview } from "@/components/patient/fhir-preview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { registerPatient } from "@/services/patient.service";

function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;

  return <p className="text-sm text-red-600">{message}</p>;
}

export function PatientForm() {
  const router = useRouter();
  const form = useForm<PatientRegistrationFormValues>({
    resolver: zodResolver(patientRegistrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      gender: "unknown",
      phone: "",
      email: "",
      address: "",
      province: "",
      healthCardNumber: "",
      programType: "",
      consent: false,
    },
  });

  const errors = form.formState.errors;

  async function onSubmit(values: PatientRegistrationFormValues) {
    try {
  await registerPatient(values);

  toast.success("Patient registered successfully");

  router.push("/patients");
} catch (error) {
  console.error(error);

  toast.error("Failed to register patient");
}



}

  return (
    
        <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <Input placeholder="First Name" {...form.register("firstName")} />
            <ErrorMessage message={errors.firstName?.message} />
          </div>

          <div className="space-y-1">
            <Input placeholder="Last Name" {...form.register("lastName")} />
            <ErrorMessage message={errors.lastName?.message} />
          </div>

          <div className="space-y-1">
            <Input type="date" {...form.register("birthDate")} />
            <ErrorMessage message={errors.birthDate?.message} />
          </div>

          <div className="space-y-1">
            <select
              {...form.register("gender")}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="unknown">Unknown</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <ErrorMessage message={errors.gender?.message} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <Input placeholder="Phone" {...form.register("phone")} />
            <ErrorMessage message={errors.phone?.message} />
          </div>

          <div className="space-y-1">
            <Input placeholder="Email" {...form.register("email")} />
            <ErrorMessage message={errors.email?.message} />
          </div>

          <div className="space-y-1">
            <Input placeholder="Province" {...form.register("province")} />
            <ErrorMessage message={errors.province?.message} />
          </div>

          <div className="space-y-1 md:col-span-2">
            <Textarea placeholder="Address" {...form.register("address")} />
            <ErrorMessage message={errors.address?.message} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Healthcare Enrollment</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <Input
              placeholder="Health Card Number"
              {...form.register("healthCardNumber")}
            />
            <ErrorMessage message={errors.healthCardNumber?.message} />
          </div>

          <div className="space-y-1">
            <select
              {...form.register("programType")}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">Select Program</option>
              <option value="Public Health Enrollment">
                Public Health Enrollment
              </option>
              <option value="Primary Care">Primary Care</option>
              <option value="Chronic Disease Program">
                Chronic Disease Program
              </option>
              <option value="Virtual Care">Virtual Care</option>
              <option value="Claims Support">Claims Support</option>
            </select>
            <ErrorMessage message={errors.programType?.message} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-1">
            <label className="flex items-start gap-3 text-sm text-slate-600">
              <Checkbox
                checked={form.watch("consent")}
                onCheckedChange={(checked) =>
                  form.setValue("consent", Boolean(checked), {
                    shouldValidate: true,
                  })
                }
              />
              I confirm that the patient has provided consent for registration
              and data processing under applicable healthcare privacy rules.
            </label>
            <ErrorMessage message={errors.consent?.message} />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline">
              Cancel
            </Button>

            <Button type="submit">Register Patient</Button>
          </div>
        </CardContent>
      </Card>
    </form>
      
          <FhirPreview values={form.watch()} />
        </div>
      




    
  );
}