import { PatientDetailsClient } from "@/components/patient/patient-details-client";

type PatientDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PatientDetailsPage({
  params,
}: PatientDetailsPageProps) {
  const { id } = await params;

  return <PatientDetailsClient patientId={id} />;
}