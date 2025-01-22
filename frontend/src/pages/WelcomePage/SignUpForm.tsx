import { useTranslation } from "react-i18next";
import AuthFormTitle from "../../components/AuthForm/AuthFormTitle";
import { useState } from "react";
import AuthFormField from "../../components/AuthForm/AuthFormField";
import CustomButton from "../../components/CustomButton";
import AuthFormType from "../../components/AuthForm/AuthFormType";

interface SignUpFormProps {
  handleAuthType: (type: string) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ handleAuthType }) => {
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState({
    username: "",
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

  return (
    <div className="w-full flex flex-col gap-y-6 p-6">
      <AuthFormTitle title={t("welcome_page:login")} />
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col bg-light_bg dark:bg-dark_bg"
      >
        <AuthFormField
          label={t("welcome_page:username")}
          inputName="username"
          placeholder={t("welcome_page:username")}
          type="text"
          value={formValues.username}
          onChange={handleChange}
        />
        <AuthFormField
          label={t("welcome_page:email")}
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
          title={t("welcome_page:sign_up")}
          type="submit"
          customStyle="mt-5 mb-2 transition-all opacity-100 hover:opacity-80 text-dark_text_primary bg-dark_bg dark:text-light_text_primary dark:bg-light_bg"
        />
        <AuthFormType
          title={t("welcome_page:already_have")}
          link={t("welcome_page:login")}
          onClick={() => handleAuthType("login")}
        />
      </form>
    </div>
  );
};

export default SignUpForm;
