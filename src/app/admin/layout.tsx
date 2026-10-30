import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Painel", template: "%s | Painel Tito S Amaral" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-mist text-ink">{children}</div>;
}
