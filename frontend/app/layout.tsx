import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Patient Registration Portal",
  description: "FHIR R4 based patient registration system on Azure Health Data Services",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster richColors position="top-right" />


      </body>
    </html>
  );
};

export default RootLayout;

