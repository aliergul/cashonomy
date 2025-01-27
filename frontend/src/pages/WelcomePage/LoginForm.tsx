import { useTranslation } from "react-i18next";
//import { Divider } from "@mui/material";
import AuthFormTitle from "../../components/AuthForm/AuthFormTitle";
import AuthFormInputField from "../../components/AuthForm/AuthFormInputField";
import { useEffect, useState } from "react";
import AuthFormType from "../../components/AuthForm/AuthFormType";
//import AuthFormLoginWith from "../../components/AuthForm/AuthFormLoginWith";
import CustomButton from "../../components/CustomButton";
import { useAppDispatch, useAppSelector } from "../../store";
import { postLogin, setErrorMessage } from "../../store/authSlice";
import CustomErrorMessage from "../../components/CustomErrorMessage";
import AuthFormPasswordField from "../../components/AuthForm/AuthFormPasswordField";

interface LoginFormProps {
  handleAuthType: (type: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleAuthType }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector((state) => state.auth.errorMessage);
  const loading = useAppSelector((state) => state.auth.isLoading);

  const [formValues, setFormValues] = useState({
    username: "",
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
    dispatch(postLogin(formValues));
  };

  // const dividerColor = () => {
  //   if (localStorage.getItem("theme") === "dark") {
  //     return "#8791a5";
  //   } else {
  //     return "#9ba1b0";
  //   }
  // };

  useEffect(() => {
    dispatch(setErrorMessage(""));
  }, []); //eslint-disable-line

  return (
    <div className="w-full flex flex-col gap-y-6 p-6">
      <CustomErrorMessage error={errorMessage} />
      <AuthFormTitle title={t("welcome_page:login")} />
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col bg-light_bg dark:bg-dark_bg"
      >
        <AuthFormInputField
          label={t("welcome_page:username_login")}
          inputName="username"
          placeholder="email@email.com"
          type="text"
          value={formValues.username}
          onChange={handleChange}
        />
        <AuthFormPasswordField
          value={formValues.password}
          onChange={handleChange}
        />
        <CustomButton
          title={t("welcome_page:login")}
          type="submit"
          loading={loading}
          customStyle="mt-5 mb-2 transition-all opacity-100 hover:opacity-80 text-dark_text_primary bg-dark_bg dark:text-light_text_primary dark:bg-light_bg"
        />
        <AuthFormType
          title={t("welcome_page:create_account")}
          link={t("welcome_page:sign_up")}
          onClick={() => handleAuthType("sign_up")}
        />

        {/* <Divider
          sx={{
            my: 2,
            "&::before, &::after": {
              borderColor: dividerColor(),
            },
          }}
          className="text-light_text_secondary dark:text-dark_text_secondary"
        >
          or
        </Divider> */}
      </form>
      {/* <AuthFormLoginWith /> */}
    </div>
  );
};

export default LoginForm;
