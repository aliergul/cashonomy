import { getTranslations, setRequestLocale } from "next-intl/server";

type AuthLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AuthLayout({
  children,
  params,
}: AuthLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tCommon = await getTranslations("Common");
  const tAuth = await getTranslations("Auth");

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-1.5 text-center">
          <span className="text-lg font-semibold tracking-tight">
            {tCommon("appName")}
          </span>
          <span className="text-sm text-muted-foreground">
            {tAuth("tagline")}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
