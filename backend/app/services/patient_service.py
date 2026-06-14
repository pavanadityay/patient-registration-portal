from app.models.patient import PatientCreate
from app.mappers.fhir_mapper import map_patient_to_fhir
from app.services.dapr_state import get_state, save_state, delete_state
from app.services.fhir_client import (
    create_patient as create_fhir_patient,
    list_patients as list_fhir_patients,
    get_patient as get_fhir_patient,
)


def map_fhir_to_patient(resource: dict) -> dict:
    name = resource.get("name", [{}])[0]
    telecom = resource.get("telecom", [])
    address = resource.get("address", [{}])[0]
    identifier = resource.get("identifier", [{}])[0]

    phone = ""
    email = ""

    for item in telecom:
        if item.get("system") == "phone":
            phone = item.get("value", "")
        elif item.get("system") == "email":
            email = item.get("value", "")

    program_type = ""

    for ext in resource.get("extension", []):
        if ext.get("url", "").endswith("program-type"):
            program_type = ext.get("valueString", "")

    return {
        "id": resource.get("id"),
        "firstName": name.get("given", [""])[0] if name.get("given") else "",
        "lastName": name.get("family", ""),
        "birthDate": resource.get("birthDate", ""),
        "gender": resource.get("gender", ""),
        "phone": phone,
        "email": email,
        "address": address.get("text", ""),
        "province": address.get("state", ""),
        "healthCardNumber": identifier.get("value", ""),
        "programType": program_type,
        "registeredDate": resource.get("meta", {}).get("lastUpdated", "")[:10],
    }


def build_cache_key(
        name=None,
        family=None,
        given=None,
        gender=None,
        identifier=None,
        birthdate=None,
        sort=None,
        count=None,
) -> str:
    return (
        f"patients:list:"
        f"name={name or ''}:"
        f"family={family or ''}:"
        f"given={given or ''}:"
        f"gender={gender or ''}:"
        f"identifier={identifier or ''}:"
        f"birthdate={birthdate or ''}:"
        f"sort={sort or ''}:"
        f"count={count or ''}"
    )


def create_patient(payload: PatientCreate) -> dict:
    fhir_resource = map_patient_to_fhir(payload)
    created = create_fhir_patient(fhir_resource)

    delete_state(
        "patients:list:name=:family=:given=:gender=:identifier=:birthdate=:sort=-_lastUpdated:count=50"
    )
    return {
        "patient": map_fhir_to_patient(created),
        "fhir": created,
        "cache": "invalidated",
    }


def get_patients(
        name=None,
        family=None,
        given=None,
        gender=None,
        identifier=None,
        birthdate=None,
        sort=None,
        count=None,
) -> list[dict]:
    cache_key = build_cache_key(
        name=name,
        family=family,
        given=given,
        gender=gender,
        identifier=identifier,
        birthdate=birthdate,
        sort=sort,
        count=count,
    )

    cached = get_state(cache_key)

    if cached:
        return cached

    bundle = list_fhir_patients(
        name=name,
        family=family,
        given=given,
        gender=gender,
        identifier=identifier,
        birthdate=birthdate,
        sort=sort,
        count=count,
    )

    patients = []

    for entry in bundle.get("entry", []):
        resource = entry.get("resource")

        if resource and resource.get("resourceType") == "Patient":
            patients.append(
                {
                    "patient": map_fhir_to_patient(resource),
                    "fhir": resource,
                }
            )

    save_state(cache_key, patients)

    return patients


def get_patient_by_id(patient_id: str) -> dict | None:
    cache_key = f"patients:detail:{patient_id}"

    cached = get_state(cache_key)

    if cached:
        return cached

    try:
        resource = get_fhir_patient(patient_id)

        result = {
            "patient": map_fhir_to_patient(resource),
            "fhir": resource,
        }

        save_state(cache_key, result)

        return result

    except Exception:
        return None
