import { z } from "zod";

export type AuthErrorMessages = {
  emailInvalid: string;
  passwordTooShort: string;
  passwordsDontMatch: string;
};

export const buildLoginSchema = (msg: AuthErrorMessages) =>
  z.object({
    email: z.email(msg.emailInvalid),
    password: z.string().min(8, msg.passwordTooShort),
  });

export const buildRegisterSchema = (msg: AuthErrorMessages) =>
  z
    .object({
      email: z.email(msg.emailInvalid),
      password: z.string().min(8, msg.passwordTooShort),
      confirmPassword: z.string().min(8, msg.passwordTooShort),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: msg.passwordsDontMatch,
    });

export type LoginValues = z.infer<ReturnType<typeof buildLoginSchema>>;
export type RegisterValues = z.infer<ReturnType<typeof buildRegisterSchema>>;
