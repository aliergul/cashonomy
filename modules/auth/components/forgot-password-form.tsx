"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  buildForgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/modules/auth/schemas/auth";

export function ForgotPasswordForm() {
  const t = useTranslations("Auth");
  const tErrors = useTranslations("Auth.errors");
  const locale = useLocale();
  const router = useRouter();

  const schema = useMemo(
    () =>
      buildForgotPasswordSchema({
        emailInvalid: tErrors("emailInvalid"),
        passwordTooShort: tErrors("passwordTooShort"),
        passwordsDontMatch: tErrors("passwordsDontMatch"),
      }),
    [tErrors],
  );

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    const supabase = createClient();
    const resetUrl = new URL(
      `/${locale}/auth/callback`,
      window.location.origin,
    );
    resetUrl.searchParams.set("next", "/reset-password");
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: resetUrl.toString(),
    });

    if (error) {
      toast.error(t("toast.resetEmailError", { message: error.message }));
      return;
    }

    toast.success(t("toast.resetEmailSent", { email: values.email }));
    router.replace("/login");
  };

  return (
    <Card>
      <CardHeader className="gap-1.5">
        <CardTitle className="text-xl">{t("forgotPasswordTitle")}</CardTitle>
        <CardDescription>{t("forgotPasswordDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder={t("emailPlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-2 w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : null}
              {t("forgotPasswordButton")}
            </Button>
          </form>
        </Form>
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
