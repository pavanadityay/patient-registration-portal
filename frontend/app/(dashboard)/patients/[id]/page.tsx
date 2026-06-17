import PatientDetailsScreen from "./PatientDetailsScreen";

type PatientDetailsPageProps = {
  params: {
    id: string;
  };
};

const PatientDetailsPage = async ({ params }: PatientDetailsPageProps) => {
  const { id } = params;

  return <PatientDetailsScreen patientId={id} />;
};

export default PatientDetailsPage;