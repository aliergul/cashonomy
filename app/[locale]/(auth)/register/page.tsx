import { setRequestLocale } from "next-intl/server";

import { RegisterForm } from "@/modules/auth/components/register-form";

type RegisterPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <RegisterForm />;
}
