from fastapi import APIRouter, HTTPException, status
from typing import Optional
from app.models.patient import PatientCreate
from app.services.patient_service import (
    create_patient,
    get_patient_by_id,
    get_patients,
)

router = APIRouter(prefix="/patients", tags=["Patients"])


@router.post("", status_code=status.HTTP_201_CREATED)
def register_patient(payload: PatientCreate):
    return create_patient(payload)


@router.get("")
def list_patients(
        name: Optional[str] = None,
        family: Optional[str] = None,
        given: Optional[str] = None,
        gender: Optional[str] = None,
        identifier: Optional[str] = None,
        birthdate: Optional[str] = None,
        sort: Optional[str] = None,
        count: Optional[int] = None,

):
    return get_patients(
        name=name,
        family=family,
        given=given,
        gender=gender,
        identifier=identifier,
        birthdate=birthdate,
        sort=sort,
        count=count
    )


@router.get("/{patient_id}")
def get_patient(patient_id: str):
    patient = get_patient_by_id(patient_id)

    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    return patient
