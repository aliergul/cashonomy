import React from "react";
import { useTranslation } from "react-i18next";

const Description: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-1/2 flex flex-col  items-center p-8">
      <h1 className="text-4xl font-bold mb-4 text-light_text_primary dark:text-dark_text_primary">
        Cashonomy
      </h1>
      <p className="text-lg text-light_text_secondary dark:text-dark_text_secondary">
        {t("welcome_page:description")}
      </p>
    </div>
  );
};

export default Description;
