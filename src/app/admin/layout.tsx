import { redirect } from "next/navigation";

import AdminChrome from "@/components/admin/admin-chrome";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return <AdminChrome>{children}</AdminChrome>;
}
