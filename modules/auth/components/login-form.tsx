"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
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
import { Separator } from "@/components/ui/separator";
import { Link, useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { GoogleSignInButton } from "@/modules/auth/components/google-sign-in-button";
import { buildLoginSchema, type LoginValues } from "@/modules/auth/schemas/auth";

export function LoginForm() {
  const t = useTranslations("Auth");
  const tErrors = useTranslations("Auth.errors");
  const router = useRouter();

  const schema = useMemo(
    () =>
      buildLoginSchema({
        emailInvalid: tErrors("emailInvalid"),
        passwordTooShort: tErrors("passwordTooShort"),
        passwordsDontMatch: tErrors("passwordsDontMatch"),
      }),
    [tErrors],
  );

  const form = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginValues) => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.error(t("toast.loginError", { message: error.message }));
      return;
    }

    toast.success(t("toast.loginSuccess"));
    router.replace("/dashboard");
    router.refresh();
  };

  return (
    <Card>
      <CardHeader className="gap-1.5">
        <CardTitle className="text-xl">{t("loginTitle")}</CardTitle>
        <CardDescription>{t("loginDescription")}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>{t("password")}</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="text-muted-foreground hover:text-foreground text-xs underline-offset-4 hover:underline"
                    >
                      {t("forgotPasswordLink")}
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      placeholder={t("passwordPlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2 w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
              {t("loginButton")}
            </Button>
          </form>
        </Form>
        <div className="relative">
          <Separator />
          <span className="bg-card text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-xs tracking-wide uppercase">
            {t("orContinueWith")}
          </span>
        </div>
        <GoogleSignInButton />
      </CardContent>
      <CardFooter className="text-muted-foreground justify-center gap-1 text-sm">
        <span>{t("noAccount")}</span>
        <Link
          href="/register"
          className="text-foreground font-medium underline-offset-4 hover:underline"
        >
          {t("createOne")}
        </Link>
      </CardFooter>
    </Card>
  );
}
