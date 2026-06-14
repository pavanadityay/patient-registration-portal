from pydantic import BaseModel
from typing import Literal


class PatientCreate(BaseModel):
    firstName: str
    lastName: str
    birthDate: str
    gender: Literal["male", "female", "other", "unknown"]
    phone: str
    email: str
    address: str
    province: str
    healthCardNumber: str
    programType: str
    consent: bool


class PatientResponse(BaseModel):
    id: str
    firstName: str
    lastName: str
    birthDate: str
    gender: str
    phone: str
    email: str
    address: str
    province: str
    healthCardNumber: str
    programType: str
    registeredDate: str