import { PatientDetailsClient } from "@/components/patient/patient-details-client";

type PatientDetailsScreenProps = {
  patientId: string;
};

const PatientDetailsScreen = ({ patientId }: PatientDetailsScreenProps) => {
  return <PatientDetailsClient patientId={patientId} />;
};

export default PatientDetailsScreen;