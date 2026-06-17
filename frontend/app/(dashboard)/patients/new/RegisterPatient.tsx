import { PageHeader } from "@/components/layout/page-header";
import { PatientForm } from "@/components/patient/patient-form";

const RegisterPatient = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Register Patient"
        description="Capture patient demographics and enrollment information."
      />

      <PatientForm />
    </div>
  );
};

export default RegisterPatient;