import { PageHeader } from "@/components/layout/page-header";
import { PatientRegistry } from "@/components/patient/patient-registry";

const PatientsScreen = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Patients"
        description="View, search, and manage registered patients."
      />
      <PatientRegistry />
    </div>
  );
};

export default PatientsScreen;