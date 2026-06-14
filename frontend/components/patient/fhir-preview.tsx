import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PatientRegistrationFormValues } from "@/schemas/patient.schema";
import { mapRegistrationToFhirPatient } from "@/lib/fhir-mapper";

type FhirPreviewProps = {
  values: Partial<PatientRegistrationFormValues>;
};

export function FhirPreview({ values }: FhirPreviewProps) {
    const fhirPatient = mapRegistrationToFhirPatient({
        firstName: values.firstName || "",
        lastName: values.lastName || "",
        birthDate: values.birthDate || "",
        gender: values.gender || "unknown",
        phone: values.phone || "",
        email: values.email || "",
        address: values.address || "",
        province: values.province || "",
        healthCardNumber: values.healthCardNumber || "",
        programType: values.programType || "",
        consent: values.consent || false,
      });
  return (
    <Card>
      <CardHeader>
        <CardTitle>FHIR R4 Patient Preview</CardTitle>
      </CardHeader>

      <CardContent>
        <pre className="max-h-[500px] overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">
          {JSON.stringify(fhirPatient, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );
}