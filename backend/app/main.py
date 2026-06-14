from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.patients import router as patients_router

app = FastAPI(
    title="Patient Registration API",
    description="FastAPI microservice for FHIR R4 patient registration",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://20.151.240.218"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "patient-registration-api",
        "fhir": "ready",
    }


app.include_router(patients_router)