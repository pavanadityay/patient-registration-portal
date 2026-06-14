from app.services.fhir_client import get_access_token
from app.services.fhir_client import list_patients

token = get_access_token()

print(token[:100])


print(list_patients())