"use client";

import Link from "next/link";
import type { Patient } from "@/types/patient";
import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PatientTableProps = {
  patients: Patient[];
  search: string;
  onSearchChange: (value: string) => void;
  genderFilter: string;
  onGenderFilterChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  loading: boolean;
};

export function PatientTable({
  patients,
  search,
  onSearchChange,
  genderFilter,
  onGenderFilterChange,
  sortBy,
  onSortByChange,
  loading,
}: PatientTableProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <Select value={genderFilter} onValueChange={onGenderFilterChange}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={onSortByChange}>
          <SelectTrigger className="w-full md:w-44">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-_lastUpdated">Latest First</SelectItem>
            <SelectItem value="_lastUpdated">Oldest First</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name..."
            className="pl-9"
          />
        </div>

        <Button asChild>
          <Link href="/patients/new">Register Patient</Link>
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Registered Patients
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {loading
              ? "Loading patients from Azure FHIR..."
              : `Showing ${patients.length} patients.`}
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Province</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Health Card</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>
                  <p className="font-medium text-slate-900">
                    {patient.firstName} {patient.lastName}
                  </p>
                  <p className="text-sm text-slate-500">{patient.email}</p>
                </TableCell>

                <TableCell>{patient.birthDate}</TableCell>
                <TableCell className="capitalize">{patient.gender}</TableCell>
                <TableCell>{patient.province}</TableCell>

                <TableCell>
                  <Badge variant="secondary">
                    {patient.programType || "Not specified"}
                  </Badge>
                </TableCell>

                <TableCell>{patient.healthCardNumber}</TableCell>

                <TableCell className="text-right">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/patients/${patient.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {!loading && patients.length === 0 && (
          <div className="px-6 py-10 text-center text-sm text-slate-500">
            No patients found.
          </div>
        )}
      </div>
    </div>
  );
}