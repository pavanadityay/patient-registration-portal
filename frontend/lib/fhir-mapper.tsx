import type { PatientRegistrationFormValues } from "@/schemas/patient.schema";

export function mapRegistrationToFhirPatient(
  values: PatientRegistrationFormValues
) {
  return {
    resourceType: "Patient",
    identifier: [
      {
        system: "https://health.gov.ns.ca/health-card",
        value: values.healthCardNumber,
      },
    ],
    name: [
      {
        use: "official",
        family: values.lastName,
        given: [values.firstName],
      },
    ],
    gender: values.gender,
    birthDate: values.birthDate,
    telecom: [
      {
        system: "phone",
        value: values.phone,
        use: "mobile",
      },
      {
        system: "email",
        value: values.email,
      },
    ],
    address: [
      {
        use: "home",
        text: values.address,
        state: values.province,
        country: "Canada",
      },
    ],
    extension: [
      {
        url: "https://fhir-demo.ca/fhir/StructureDefinition/program-type",
        valueString: values.programType,
      },
      {
        url: "https://fhir-demo.ca/fhir/StructureDefinition/privacy-consent",
        valueBoolean: values.consent,
      },
    ],
  };
}