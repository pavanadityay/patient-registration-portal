"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

import { getPatient } from "@/services/patient.service";
import type { Patient } from "@/types/patient";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PatientDetailsClientProps = {
  patientId: string;
};

export function PatientDetailsClient({
  patientId,
}: PatientDetailsClientProps) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatient();
  }, [patientId]);

  async function loadPatient() {
    try {
      const data = await getPatient(patientId);

      setPatient(data.patient);
    } catch {
      setPatient(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!patient) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {patient.firstName} {patient.lastName}
        </h1>

        <p className="mt-2 text-slate-600">
          Patient demographic and enrollment profile.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Summary</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Patient ID</p>
            <p className="font-medium">{patient.id}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Health Card</p>
            <p className="font-medium">{patient.healthCardNumber}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Date of Birth</p>
            <p className="font-medium">{patient.birthDate}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Gender</p>
            <p className="font-medium capitalize">{patient.gender}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="font-medium">{patient.email}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Phone</p>
            <p className="font-medium">{patient.phone}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Province</p>
            <p className="font-medium">{patient.province}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Registered Date</p>
            <p className="font-medium">{patient.registeredDate}</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-slate-500">Program</p>

            <Badge variant="secondary" className="mt-2">
              {patient.programType}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}