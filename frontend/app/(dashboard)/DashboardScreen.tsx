import Link from "next/link";
import {
  ClipboardPlus,
  Database,
  ShieldCheck,
  UsersRound,
  Activity,
} from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Patient } from "@/types/patient";

type ApiPatientItem = { patient: Patient };

async function getPatients(): Promise<Patient[]> {
  const apiBaseUrl = process.env.INTERNAL_API_BASE_URL;

  if (!apiBaseUrl) return [];

  try {
    const res = await fetch(`${apiBaseUrl}/patients?sort=-_lastUpdated&count=5`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = (await res.json()) as ApiPatientItem[];
    return data.map((item) => item.patient);
  } catch (e) {
    return [];
  }
}

const DashboardScreen = async () => {
  const patients = await getPatients();

  const totalPatients = patients.length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patient Registration Portal"
        description="FHIR R4 based enrollment system for healthcare registration workflows."
        action={
          <Button asChild>
            <Link href="/patients/new">
              <ClipboardPlus className="mr-2 h-4 w-4" />
              Register Patient
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-slate-500">Total Patients</CardTitle>
          </CardHeader>

          <CardContent className="text-3xl font-bold text-slate-900">{totalPatients}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-slate-500">FHIR Standard</CardTitle>
          </CardHeader>

          <CardContent className="flex items-center gap-2 text-lg font-semibold">
            <Database className="h-5 w-5 text-blue-600" />
            R4 Patient
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-slate-500">Security</CardTitle>
          </CardHeader>

          <CardContent className="flex items-center gap-2 text-lg font-semibold">
            <ShieldCheck className="h-5 w-5 text-green-600" />
            Consent Based
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-slate-500">Workflow</CardTitle>
          </CardHeader>

          <CardContent className="flex items-center gap-2 text-lg font-semibold">
            <UsersRound className="h-5 w-5 text-purple-600" />
            Enrollment
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Recent Registration Activity
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {patients.slice(0, 5).map((patient) => (
            <div key={patient.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
              <div>
                <p className="font-medium text-slate-900">
                  {patient.firstName} {patient.lastName}
                </p>

                <p className="text-sm text-slate-500">Registered under {patient.programType}</p>
              </div>

              <p className="text-sm text-slate-500">{patient.registeredDate}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardScreen;
