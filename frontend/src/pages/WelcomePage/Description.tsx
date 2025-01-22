import React from "react";
import { useTranslation } from "react-i18next";

const Description: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-1/2 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-light_text_primary dark:text-dark_text_primary">
        Cashonomy
      </h1>
      <div className="text-lg text-light_text_secondary dark:text-dark_text_secondary">
        <ul className="list-disc space-y-2 text-center text-lg text-light_text_secondary dark:text-dark_text_secondary max-w-xl">
          <li>{t("welcome_page:description")}</li>
          <li>{t("welcome_page:description")}</li>
          <li>{t("welcome_page:description")}</li>
          <li>{t("welcome_page:description")}</li>
        </ul>
      </div>
    </div>
  );
};

export default Description;
