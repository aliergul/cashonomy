import { Field, Input, Label } from "@headlessui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface LoginFormProps {
  handleAuthType: (type: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleAuthType }) => {
  const { t } = useTranslation();
  const handleSubmit = (e: React.FormEvent) => {
    console.log("e", e);
  };
  console.log("handleAuthType", handleAuthType);
  return (
    <div className="w-full">
      <span className="justify-start text-3xl font-semibold">
        {t("welcome_page:login")}
      </span>
    </div>
  );
};

export default LoginForm;
