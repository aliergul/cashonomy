import { setRequestLocale } from "next-intl/server";

import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage({
  params,
}: PageProps<"/[locale]/dashboard">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-3 px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="text-sm text-muted-foreground">
        Signed in as <span className="font-medium">{user?.email}</span>
      </p>
      <p className="text-xs text-muted-foreground">
        Full dashboard will arrive in Faz 10.
      </p>
    </div>
  );
}
