import { setRequestLocale } from "next-intl/server";

import { ResetPasswordForm } from "@/modules/auth/components/reset-password-form";

type ResetPasswordPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ResetPasswordPage({
  params,
}: ResetPasswordPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ResetPasswordForm />;
}
