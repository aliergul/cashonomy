import { useTranslation } from "react-i18next";
import { Divider } from "@mui/material";
import AuthFormTitle from "../../components/AuthForm/AuthFormTitle";
import AuthFormField from "../../components/AuthForm/AuthFormField";
import { useState } from "react";
import AuthFormType from "../../components/AuthForm/AuthFormType";
import AuthFormLoginWith from "../../components/AuthForm/AuthFormLoginWith";
import CustomButton from "../../components/CustomButton";

interface LoginFormProps {
  handleAuthType: (type: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleAuthType }) => {
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formValues);
  };

  const dividerColor = () => {
    if (localStorage.getItem("theme") === "dark") {
      return "#8791a5";
    } else {
      return "#9ba1b0";
    }
  };
  return (
    <div className="w-full flex flex-col gap-y-6">
      <AuthFormTitle title={t("welcome_page:login")} />
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col bg-light_bg dark:bg-dark_bg"
      >
        <AuthFormField
          label={t("welcome_page:username")}
          inputName="email"
          placeholder="email@email.com"
          type="text"
          value={formValues.email}
          onChange={handleChange}
        />
        <AuthFormField
          label={t("welcome_page:password")}
          inputName="password"
          placeholder="******"
          type="password"
          value={formValues.password}
          onChange={handleChange}
        />
        <CustomButton
          title={t("welcome_page:login")}
          type="submit"
          customStyle="mt-5 mb-2 transition-all opacity-100 hover:opacity-80 text-dark_text_primary bg-dark_bg dark:text-light_text_primary dark:bg-light_bg"
        />
        <AuthFormType
          title={t("welcome_page:create_account")}
          link={t("welcome_page:sign_up")}
          onClick={() => handleAuthType("sign_up")}
        />

        <Divider
          sx={{
            my: 2,
            "&::before, &::after": {
              borderColor: dividerColor(),
            },
          }}
          className="text-light_text_secondary dark:text-dark_text_secondary"
        >
          or
        </Divider>
      </form>
      <AuthFormLoginWith />
    </div>
  );
};

export default LoginForm;
