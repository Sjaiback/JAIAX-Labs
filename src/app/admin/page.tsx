import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminDemo } from "@/components/admin/admin-demo";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Administración demo",
  robots: { index: false, follow: false },
};
export default function Admin() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <main id="main" className="admin-page container">
      <AdminDemo />
    </main>
  );
}
