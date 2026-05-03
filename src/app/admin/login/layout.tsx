import { Suspense } from "react";

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="min-h-screen bg-[#f4f4f5]" />}>{children}</Suspense>;
}
