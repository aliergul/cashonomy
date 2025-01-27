import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../store";
import { postLogout } from "../store/authSlice";
import ColorModeSelect from "../components/ColorModeSelect";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const logout = () => {
    setLoading(true);
    const timeout = setTimeout(() => {
      dispatch(postLogout());
    }, 1000);
    return () => {
      setLoading(false);
      clearTimeout(timeout);
    };
  };

  return (
    <>
      <CustomButton
        title={t("dashboard:logout")}
        customOnClick={logout}
        loading={loading}
        customStyle="mt-5 mb-2 transition-all opacity-100 hover:opacity-80 text-dark_text_primary bg-dark_bg dark:text-light_text_primary dark:bg-light_bg"
      />
      <ColorModeSelect />
    </>
  );
};

export default Dashboard;
