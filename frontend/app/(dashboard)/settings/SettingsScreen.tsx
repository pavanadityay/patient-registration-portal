import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Database, KeyRound, Activity } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";

const SettingsScreen = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Application configuration and healthcare platform readiness."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-600" />
              FHIR Service
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            Azure Health Data Services FHIR R4 integration will be configured
            through backend environment variables.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-purple-600" />
              Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            Azure Entra ID authentication and role-based access control will be
            added for healthcare staff and administrators.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-600" />
              Privacy & Compliance
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            The portal is designed with consent capture, audit readiness,
            encryption, and PIPEDA/HIPAA-aware workflows.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-orange-600" />
              Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            Application Insights, Azure Monitor, and audit logs will be used for
            operational visibility.
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsScreen;
