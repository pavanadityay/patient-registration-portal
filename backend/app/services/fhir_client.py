import os
import httpx
from azure.identity import ClientSecretCredential
from dotenv import load_dotenv

load_dotenv()

TENANT_ID = os.getenv("AZURE_TENANT_ID")
CLIENT_ID = os.getenv("AZURE_CLIENT_ID")
CLIENT_SECRET = os.getenv("AZURE_CLIENT_SECRET")
FHIR_BASE_URL = os.getenv("FHIR_BASE_URL")

credential = ClientSecretCredential(
    tenant_id=TENANT_ID,
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
)


def get_access_token():
    scope = f"{FHIR_BASE_URL}/.default"

    print(f"Using scope: {scope}")

    token = credential.get_token(scope)

    return token.token


def create_patient(resource: dict):
    token = get_access_token()

    response = httpx.post(
        f"{FHIR_BASE_URL}/Patient",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/fhir+json",
            "Accept": "application/fhir+json",
        },
        json=resource,
        timeout=30,
    )

    print(response.status_code)
    print(response.text)

    response.raise_for_status()

    return response.json()


def list_patients(
    name: str | None = None,
    family: str | None = None,
    given: str | None = None,
    gender: str | None = None,
    identifier: str | None = None,
    birthdate: str | None = None,
    sort: str | None = None,
    count: int | None = None,
):
    token = get_access_token()

    params = {}

    if name:
        params["name"] = name

    if family:
        params["family"] = family

    if given:
        params["given"] = given

    if gender:
        params["gender"] = gender

    if identifier:
        params["identifier"] = identifier

    if birthdate:
        params["birthdate"] = birthdate

    if sort:
        params["_sort"] = sort

    if count:
        params["_count"] = count

    response = httpx.get(
        f"{FHIR_BASE_URL}/Patient",
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/fhir+json",
        },
        params=params,
        timeout=30,
    )

    response.raise_for_status()

    return response.json()


def get_patient(patient_id: str):
    token = get_access_token()

    response = httpx.get(
        f"{FHIR_BASE_URL}/Patient/{patient_id}",
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/fhir+json",
        },
        timeout=30,
    )

    response.raise_for_status()

    return response.json()