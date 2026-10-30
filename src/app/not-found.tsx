import type { Metadata } from "next";
import SiteLayout from "./(site)/layout";
import { NotFoundContent } from "@/components/layout/NotFoundContent";

export const metadata: Metadata = { title: "Página não encontrada", robots: { index: false } };

export default function NotFound() {
  return (
    <SiteLayout>
      <NotFoundContent />
    </SiteLayout>
  );
}
