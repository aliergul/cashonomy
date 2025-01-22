import React from "react";
import Google from "../../assets/icons/Google";
import Facebook from "../../assets/icons/Facebook";
import CustomButton from "../CustomButton";
import { useTranslation } from "react-i18next";

interface AuthFormLoginWithProps {
  title?: string;
}

const AuthFormLoginWith: React.FC<AuthFormLoginWithProps> = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      <CustomButton
        title={t("welcome_page:login_with_google")}
        icon={<Google />}
        customStyle="hover:cursor-not-allowed w-full flex items-center transition-all justify-center border dark:border-2 dark:border-solid border-dark_border gap-2 text-sm hover:opacity-100 opacity-70 text-light_text_primary bg-light_grey dark:text-dark_text_primary dark:bg-dark_bg_2"
      />
      <CustomButton
        title={t("welcome_page:login_with_facebook")}
        icon={<Facebook />}
        customStyle="hover:cursor-not-allowed w-full flex items-center transition-all justify-center border dark:border-2 dark:border-solid border-dark_border gap-2 text-sm hover:opacity-100 opacity-70 text-light_text_primary bg-light_grey dark:text-dark_text_primary dark:bg-dark_bg_2"
      />
    </div>
  );
};

export default AuthFormLoginWith;
