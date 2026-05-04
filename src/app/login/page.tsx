import { Suspense } from "react";

import LoginClient from "./login-client";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f4f4f5] text-sm text-[#71717a]">
          Cargando…
        </div>
      }
    >
      <LoginClient />
    </Suspense>
  );
}
