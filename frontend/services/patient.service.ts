import type { PatientRegistrationFormValues } from "@/schemas/patient.schema";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;;

export async function getPatients(params?: {
  name?: string;
  family?: string;
  given?: string;
  gender?: string;
  identifier?: string;
  birthdate?: string;
  sort?: string;
  count?: number;
}) {
  const searchParams = new URLSearchParams();

  if (params?.name) searchParams.append("name", params.name);
  if (params?.family) searchParams.append("family", params.family);
  if (params?.given) searchParams.append("given", params.given);
  if (params?.gender) searchParams.append("gender", params.gender);
  if (params?.identifier)
    searchParams.append("identifier", params.identifier);
  if (params?.birthdate)
    searchParams.append("birthdate", params.birthdate);
  if (params?.sort) searchParams.append("sort", params.sort);
  if (params?.count)
    searchParams.append("count", params.count.toString());

  const response = await fetch(
    `${API_BASE}/patients?${searchParams.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }

  return response.json();
}

export async function getPatient(id: string) {
  const response = await fetch(`${API_BASE}/patients/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch patient");
  }

  return response.json();
}

export async function registerPatient(
  values: PatientRegistrationFormValues
) {
  const response = await fetch(`${API_BASE}/patients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("Failed to register patient");
  }

  return response.json();
}