import type { Metadata } from "next";
import ServicePage from "@/components/sections/ServicePage";

export const metadata: Metadata = {
  title: "Backend Systems | Lubech",
  description:
    "Secure, scalable APIs, databases and cloud infrastructure that quietly power everything your product needs to do.",
};

export default function BackendSystemsPage() {
  return <ServicePage slug="backendsystems" />;
}
