import { MailCheck } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

type VerifyEmailPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function VerifyEmailPage({
  params,
}: VerifyEmailPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Auth");

  return (
    <Card>
      <CardHeader className="items-center gap-3 text-center">
        <div className="flex size-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <MailCheck className="size-5" />
        </div>
        <CardTitle className="text-xl">{t("verifyEmailTitle")}</CardTitle>
        <CardDescription className="text-balance">
          {t("verifyEmailDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center text-sm text-muted-foreground">
        {t("verifyEmailHint")}
      </CardContent>
      <CardFooter className="justify-center text-sm">
        <Link
          href="/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          {t("backToLogin")}
        </Link>
      </CardFooter>
    </Card>
  );
}
