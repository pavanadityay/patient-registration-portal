import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

const DashboardLayout = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="lg:pl-72">
        <Navbar />

        <main className="px-6 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;