import { PageHeader } from "@/components/layout/page-header";
import { PatientForm } from "@/components/patient/patient-form";

export default function NewPatientPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Register Patient"
        description="Capture patient demographics and enrollment information."
      />

      <PatientForm />
    </div>
  );
}