import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduCentered | Smart Learning & Analytics",
  description: "Smart Learning & Analytics Platform for SMK Akuntansi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="id"><body>{children}</body></html>;
}