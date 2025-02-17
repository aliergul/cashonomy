import { useTranslation } from "react-i18next";
import AuthFormTitle from "../../components/AuthForm/AuthFormTitle";
import { useState } from "react";
import AuthFormField from "../../components/AuthForm/AuthFormInputField";
import CustomButton from "../../components/CustomButton";
import AuthFormType from "../../components/AuthForm/AuthFormType";
import AuthFormPasswordField from "../../components/AuthForm/AuthFormPasswordField";
import { useAppDispatch, useAppSelector } from "../../store";
import { postSignUp, setErrorMessage } from "../../store/authSlice";
import CustomErrorMessage from "../../components/CustomErrorMessage";
import useSnackbar from "../../components/Snackbar/useSnackbar";

interface SignUpFormProps {
  handleAuthType: (type: string) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ handleAuthType }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const addSnackbar = useSnackbar();
  const errorMessage = useAppSelector((state) => state.auth.errorMessage);
  const loading = useAppSelector((state) => state.auth.isLoading);
  const [repeatPassword, setRepeatPassword] = useState("");

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

  const handleRepeatPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (repeatPassword !== formValues.password) {
      dispatch(setErrorMessage(t("errors:repeat_password")));
      return;
    } else {
      handleSignUp(formValues);
    }
  };

  const handleSignUp = async (formValues: any) => {
    const resultAction = await dispatch(postSignUp(formValues));

    if (postSignUp.fulfilled.match(resultAction)) {
      addSnackbar(t("welcome_page:sign_up_success"));
      dispatch(setErrorMessage(""));

      const timeout = setTimeout(() => {
        handleAuthType("login");
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-6 p-6">
      <CustomErrorMessage error={errorMessage} />
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
        <AuthFormPasswordField
          value={formValues.password}
          onChange={handleChange}
        />
        <AuthFormPasswordField
          value={repeatPassword}
          onChange={handleRepeatPassword}
          title={t("welcome_page:repeat_password")}
        />
        <CustomButton
          title={t("welcome_page:sign_up")}
          type="submit"
          loading={loading}
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
