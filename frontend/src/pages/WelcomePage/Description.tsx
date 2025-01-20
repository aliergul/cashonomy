import React from "react";
import { useTranslation } from "react-i18next";

const Description: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-3/5 text-white flex flex-col justify-center items-center p-8">
      <h1 className="text-4xl font-bold mb-4">Cashonomy</h1>
      <p className="text-lg">{t("welcome_page:description")}</p>
    </div>
  );
};

export default Description;
