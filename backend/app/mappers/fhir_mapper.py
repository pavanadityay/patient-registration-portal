from app.models.patient import PatientCreate


def map_patient_to_fhir(patient: PatientCreate) -> dict:
    return {
        "resourceType": "Patient",
        "active":True,
        "identifier": [
            {
                "system": "https://fhir-demo.ca/fhir/identifier/health-card",
                "value": patient.healthCardNumber,
            }
        ],
        "name": [
            {
                "use": "official",
                "family": patient.lastName,
                "given": [patient.firstName],
            }
        ],
        "gender": patient.gender,
        "birthDate": patient.birthDate,
        "telecom": [
            {"system": "phone", "value": patient.phone, "use": "mobile"},
            {"system": "email", "value": patient.email},
        ],
        "address": [
            {
                "use": "home",
                "text": patient.address,
                "state": patient.province,
                "country": "Canada",
            }
        ],
        "extension": [
            {
                "url": "https://fhir-demo.ca/fhir/StructureDefinition/program-type",
                "valueString": patient.programType,
            },
            {
                "url": "https://fhir-demo.ca/fhir/StructureDefinition/privacy-consent",
                "valueBoolean": patient.consent,
            },
        ],
    }