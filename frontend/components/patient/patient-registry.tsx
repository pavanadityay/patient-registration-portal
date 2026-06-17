"use client";

import { useEffect, useState } from "react";
import type { Patient } from "@/types/patient";
import { getPatients } from "@/services/patient.service";
import { PatientTable } from "@/components/patient/patient-table";

export function PatientRegistry() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [sortBy, setSortBy] = useState("-_lastUpdated");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadPatients();
    }, 400);

    return () => clearTimeout(timeout);
  }, [search, genderFilter, sortBy]);

  async function loadPatients() {
    setLoading(true);

    try {
      const data = await getPatients({
        name: search || undefined,
        gender: genderFilter === "all" ? undefined : genderFilter,
        sort: sortBy,
        count: 50,
      });

      setPatients(data.map((item) => item.patient));
    } finally {
      setLoading(false);
    }
  }

  return (
    <PatientTable
      patients={patients}
      search={search}
      onSearchChange={setSearch}
      genderFilter={genderFilter}
      onGenderFilterChange={setGenderFilter}
      sortBy={sortBy}
      onSortByChange={setSortBy}
      loading={loading}
    />
  );
}