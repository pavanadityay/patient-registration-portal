from app.services.fhir_client import create_patient

patient = {
    "resourceType": "Patient",
    "active": True,
    "name": [
        {
            "use": "official",
            "family": "Doe",
            "given": ["John"]
        }
    ],
    "gender": "male",
    "birthDate": "1995-01-01"
}

result = create_patient(patient)

print(result)